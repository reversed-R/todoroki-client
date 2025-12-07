import { NavigationBar } from "../NavigationBar";

export function CommonNavigationBar() {
  return (
    <NavigationBar
      links={[
        { label: "Todo", link: "/todos" },
        { label: "Do it!", link: "/doits" },
        { label: "Todo / Do it!", link: "/todos-doits" },
        { label: "Calendar", link: "/calendar" },
      ]}
    />
  );
}
