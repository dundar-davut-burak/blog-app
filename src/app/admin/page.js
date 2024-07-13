import AdminSiteSettings from "@/components/adminSiteSettings";
import CardStatistics from "@/components/cardStats";

export default function AdminPage() {
    return (
        <section>
            <CardStatistics />
            <AdminSiteSettings />

        </section>
    )
}