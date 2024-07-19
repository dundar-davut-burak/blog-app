import AccountSettings from "@/components/admin_components/settings_components/accountSettings";
import SiteSettings from "@/components/admin_components/settings_components/siteSettings";

export default function SettingsPage() {
  return (
    <>
      <section>
        <AccountSettings />
      </section>
      <section>
        <SiteSettings />
      </section>
    </>
  );
}
