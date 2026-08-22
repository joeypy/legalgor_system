import { config as loadEnv } from "dotenv";
import { eq } from "drizzle-orm";

loadEnv({ path: ".env" });
loadEnv({ path: ".dev.vars" });

async function main() {
  const { auth } = await import("../features/identity/auth");
  const { db } = await import("../lib/db");
  const { account, user } = await import("../features/identity/schema");

  const seeds = [
    {
      email: "admin@legalgor.com",
      password: "legalgor123",
      name: "Admin LegalGor",
      role: "admin",
    },
    {
      email: "usuario@legalgor.com",
      password: "legalgor123",
      name: "Usuario LegalGor",
      role: "user",
    },
  ] as const;

  for (const seed of seeds) {
    const existing = await db
      .select()
      .from(user)
      .where(eq(user.email, seed.email))
      .limit(1);

    if (existing[0]) {
      const credentials = await db
        .select()
        .from(account)
        .where(eq(account.userId, existing[0].id))
        .limit(1);

      if (!credentials[0]?.password) {
        await db.delete(user).where(eq(user.id, existing[0].id));
        console.log(`Removed incomplete user ${seed.email}`);
      } else {
        await db
          .update(user)
          .set({ role: seed.role, name: seed.name, emailVerified: true })
          .where(eq(user.email, seed.email));
        console.log(`Updated role for ${seed.email} → ${seed.role}`);
        continue;
      }
    }

    const result = await auth.api.signUpEmail({
      body: {
        email: seed.email,
        password: seed.password,
        name: seed.name,
      },
    });

    if (!result) {
      console.error(`Failed to create ${seed.email}`);
      continue;
    }

    await db
      .update(user)
      .set({ role: seed.role, emailVerified: true })
      .where(eq(user.email, seed.email));

    console.log(`Created ${seed.email} (${seed.role})`);
  }
}

main()
  .then(() => {
    console.log("Seed complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
