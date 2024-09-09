export default function FieldOrderDetail({ title, value }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-muted-foreground">{title}</h1>
      <div className="font-semibold text-[#0C0D36]">{value}</div>
    </div>
  );
}
