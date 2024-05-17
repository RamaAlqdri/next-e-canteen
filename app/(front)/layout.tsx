export default function FrontLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <main className="flex-grow container px-6 md:px-10 lg:px-40  pt-16">{children}</main>
  );
}
