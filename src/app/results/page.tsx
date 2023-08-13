import ServiceList from "@/components/serviceList";

export default function ResultsPage(props: {
  searchParams: { search?: string };
}) {
  const searchTerm = props.searchParams.search;
  return <ServiceList searchTerm={searchTerm!} />;
}
