// Update this page (the content is just a fallback if you fail to update the page)

import { TodoDataTable } from "@/components/TodoDataTable";
import { MadeWithApplaa } from "@/components/made-with-applaa";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <TodoDataTable />
      <MadeWithApplaa />
    </Layout>
  );
};

export default Index;