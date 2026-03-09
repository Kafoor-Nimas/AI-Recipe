import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { has } = await auth();
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <section className="pt-32 pb-20 px-4">
        <Button variant="primary" size="xl">
          Subscribe
        </Button>
      </section>
    </div>
  );
}
