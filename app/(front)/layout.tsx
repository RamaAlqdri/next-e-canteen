export default function FrontLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <main className="flex-grow container px-6 sm:px-10 pt-16">{children}</main>
  );
}
