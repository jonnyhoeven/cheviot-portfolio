import ContactForm from "../components/ContactForm";
export default async function Index() {
  return (
    <div className="w-full animate-in flex items-center justify-center h-screen dark:text-white">
      <ContactForm />
    </div>
  );
}
