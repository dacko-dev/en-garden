export default function DashboardAccountLayout({
  children,
  personal,
  company,
  addresses,
  accountActions,
}: {
  children: React.ReactNode;
  personal: React.ReactNode;
  company: React.ReactNode;
  addresses: React.ReactNode;
  accountActions: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p>View and edit your account details</p>
      </div>
      <div className="mt-8 flex flex-col lg:grid lg:grid-cols-2 gap-8">
        {children}
        {personal}
        {company}
        {addresses}
        {accountActions}
      </div>
    </div>
  );
}
