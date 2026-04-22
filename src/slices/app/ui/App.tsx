import { Route, Switch } from "wouter";
import { HomePage } from "../../pages/home";
import { NotFoundPage } from "../../pages/not-found";

export function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

