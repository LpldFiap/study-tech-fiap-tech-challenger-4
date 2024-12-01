import { QueryClient, QueryClientProvider } from "react-query";
import AppRoutes from "./app.routes";

const queryClient = new QueryClient();

export function Routes() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes/>
    </QueryClientProvider>
  );
}