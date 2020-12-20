import React from "react";

import async from "../components/Async";

import {
  BookOpen,
  Briefcase,
  Calendar as CalendarIcon,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  Monitor,
  ShoppingCart,
  PieChart,
  Sliders,
  User,
  Users,
  Globe,
} from "react-feather";

// Auth components
const SignIn = async(() => import("../pages/auth/SignIn"));
const SignUp = async(() => import("../pages/auth/SignUp"));
const ResetPassword = async(() => import("../pages/auth/ResetPassword"));
const Page404 = async(() => import("../pages/auth/Page404"));
const Page500 = async(() => import("../pages/auth/Page500"));

// Components components
const Alerts = async(() => import("../pages/components/Alerts"));
const Avatars = async(() => import("../pages/components/Avatars"));
const Badges = async(() => import("../pages/components/Badges"));
const Buttons = async(() => import("../pages/components/Buttons"));
const Cards = async(() => import("../pages/components/Cards"));
const Chips = async(() => import("../pages/components/Chips"));
const Dialogs = async(() => import("../pages/components/Dialogs"));
const ExpPanels = async(() => import("../pages/components/ExpansionPanels"));
const Lists = async(() => import("../pages/components/Lists"));
const Menus = async(() => import("../pages/components/Menus"));
const Pagination = async(() => import("../pages/components/Pagination"));
const Progress = async(() => import("../pages/components/Progress"));
const Snackbars = async(() => import("../pages/components/Snackbars"));
const Tooltips = async(() => import("../pages/components/Tooltips"));

// Dashboards components
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));

// Forms components
const Pickers = async(() => import("../pages/forms/Pickers"));
const SelectionCtrls = async(() => import("../pages/forms/SelectionControls"));
const Selects = async(() => import("../pages/forms/Selects"));
const TextFields = async(() => import("../pages/forms/TextFields"));
const Dropzone = async(() => import("../pages/forms/Dropzone"));
const Editors = async(() => import("../pages/forms/Editors"));

// Icons components
const MaterialIcons = async(() => import("../pages/icons/MaterialIcons"));
const FeatherIcons = async(() => import("../pages/icons/FeatherIcons"));

// Pages components
const Blank = async(() => import("../pages/pages/Blank"));
const InvoiceDetails = async(() => import("../pages/pages/InvoiceDetails"));
const InvoiceList = async(() => import("../pages/pages/InvoiceList"));
const Orders = async(() => import("../pages/pages/Orders"));
const Pricing = async(() => import("../pages/pages/Pricing"));
const Profile = async(() => import("../pages/pages/Profile"));
const Settings = async(() => import("../pages/pages/Settings"));
const Tasks = async(() => import("../pages/pages/Tasks"));
const Projects = async(() => import("../pages/pages/Projects"));
const Calendar = async(() => import("../pages/pages/Calendar"));

// Tables components
const SimpleTable = async(() => import("../pages/tables/SimpleTable"));
const AdvancedTable = async(() => import("../pages/tables/AdvancedTable"));

// Chart components
const Chartjs = async(() => import("../pages/charts/Chartjs"));

// Maps components
const GoogleMaps = async(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = async(() => import("../pages/maps/VectorMaps"));

// Documentation
const Welcome = async(() => import("../pages/docs/Welcome"));
const GettingStarted = async(() => import("../pages/docs/GettingStarted"));
const EnvironmentVariables = async(() =>
  import("../pages/docs/EnvironmentVariables")
);
const Deployment = async(() => import("../pages/docs/Deployment"));
const Theming = async(() => import("../pages/docs/Theming"));
const StateManagement = async(() => import("../pages/docs/StateManagement"));
const Support = async(() => import("../pages/docs/Support"));
const Changelog = async(() => import("../pages/docs/Changelog"));
const Presentation = async(() => import("../pages/docs/Presentation"));
//Spareparts
const GET_Spare = async(() => import("../pages/Spare/GET_spare"));
const Mangenese_spare = async(() => import("../pages/Spare/Mangenese_spare"));
const Mechanical_spare = async(() => import("../pages/Spare/Mechanical_spare"));
const Roller_spare = async(() => import("../pages/Spare/Roller_spare"));
//Cart
const Cart_spare = async(() => import("../pages/Spare/cart_spare.js"));
//Site Order
const Site_orders = async(() => import("../pages/Spare/site_orders"));
//Main Order
const main_orders = async(() => import("../pages/main_0rder/main_order.page"));

//Site Components
const site_admin = async(() => import("../pages/site/site.admin.page"));
const site_main = async(() => import("../pages/site/site.mianpage"));
const site_add = async(() => import("../pages/site/site.add.page"));
const site_delete = async(() => import("../pages/site/site.delete.page"));
const site_edit = async(() => import("../pages/site/site.edit.page"));

//Spare Admin Components
const spare_admin = async(() => import("../pages/spare_admin/spareAdmin.page"));
const spare_add = async(() => import("../pages/spare_admin/spareAdmin.add"));
const spare_delete = async(() =>
  import("../pages/spare_admin/spareAdmin.delete")
);
const spare_edit = async(() => import("../pages/spare_admin/spareAdmin.edit"));

//Spare Admin Components
const comparison_admin = async(() =>
  import("../pages/comparison_admin/comparison_admin.page")
);
const comparison_add = async(() =>
  import("../pages/comparison_admin/comparison_admin.add")
);
const comparison_delete = async(() =>
  import("../pages/comparison_admin/comparison_admin.delete")
);
const comparison_edit = async(() =>
  import("../pages/comparison_admin/comparison_admin.edit")
);

//Spare Admin Components
const roller_admin = async(() =>
  import("../pages/roller-admin/rollerAdmin.page")
);
const roller_add = async(() => import("../pages/roller-admin/rollerAdmin.add"));
const roller_delete = async(() =>
  import("../pages/roller-admin/rollerAdmin.delete")
);
const roller_edit = async(() =>
  import("../pages/roller-admin/rollerAdmin.edit")
);

const upload = async(() => import("../pages/uploads/uploads"));

const dashboardsRoutes = {
  id: "Spareparts",
  path: "/dashboard",
  header: "Pages",
  icon: <Sliders />,
  containsHome: true,
  children: [
    {
      path: "/home",
      name: "GET",
      component: GET_Spare,
    },
    {
      path: "/dashboard/mechanical",
      name: "Mechanical",
      component: Mechanical_spare,
    },
    {
      path: "/dashboard/mangenese",
      name: "Manganese",
      component: Mangenese_spare,
    },
    {
      path: "/dashboard/roller",
      name: "Roller",
      component: Roller_spare,
    },
  ],
  component: null,
};

const pagesRoutes = {
  id: "Pages",
  path: "/pages",
  icon: <Layout />,
  children: [
    {
      path: "/pages/settings",
      name: "Settings",
      component: Settings,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
    },
    {
      path: "/pages/blank",
      name: "Blank Page",
      component: Blank,
    },
  ],
  component: null,
};

const profileRoutes = {
  id: "Profile",
  path: "/profile",
  icon: <User />,
  component: Profile,
  children: null,
};

const projectsRoutes = {
  id: "Projects",
  path: "/projects",
  icon: <Briefcase />,
  badge: "8",
  component: Projects,
  children: null,
};

const invoiceRoutes = {
  id: "Invoices",
  path: "/invoices",
  icon: <CreditCard />,
  children: [
    {
      path: "/invoices",
      name: "List",
      component: InvoiceList,
    },
    {
      path: "/invoices/detail",
      name: "Details",
      component: InvoiceDetails,
    },
  ],
  component: null,
};

const orderRoutes = {
  id: "Orders",
  path: "/orders",
  icon: <ShoppingCart />,
  component: Orders,
  children: null,
};

const cartRoutes = {
  id: "Site Cart",
  path: "/carts",
  icon: <ShoppingCart />,
  component: Cart_spare,
  children: null,
};

const siteOrders = {
  id: "Site Orders",
  path: "/siteorders",
  icon: <CreditCard />,
  component: Site_orders,
  children: null,
};

const mainOrders = {
  id: "Main Orders",
  path: "/mainorder",
  icon: <Briefcase />,
  component: main_orders,
  children: null,
};

const tasksRoutes = {
  id: "Tasks",
  path: "/tasks",
  icon: <CheckSquare />,
  badge: "17",
  component: Tasks,
  children: null,
};

const calendarRoutes = {
  id: "Calendar",
  path: "/calendar",
  icon: <CalendarIcon />,
  component: Calendar,
  children: null,
};

const authRoutes = {
  id: "Auth",
  path: "/auth",
  icon: <Users />,
  children: [
    {
      path: "/",
      name: "Sign In",
      component: SignIn,
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp,
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword,
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404,
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500,
    },
  ],
  component: null,
};

const componentsRoutes = {
  id: "Components",
  path: "/components",
  header: "Elements",
  icon: <Grid />,
  children: [
    {
      path: "/components/alerts",
      name: "Alerts",
      component: Alerts,
    },
    {
      path: "/components/avatars",
      name: "Avatars",
      component: Avatars,
    },
    {
      path: "/components/badges",
      name: "Badges",
      component: Badges,
    },
    {
      path: "/components/buttons",
      name: "Buttons",
      component: Buttons,
    },
    {
      path: "/components/cards",
      name: "Cards",
      component: Cards,
    },
    {
      path: "/components/chips",
      name: "Chips",
      component: Chips,
    },
    {
      path: "/components/dialogs",
      name: "Dialogs",
      component: Dialogs,
    },
    {
      path: "/components/expansion-panels",
      name: "Expansion Panels",
      component: ExpPanels,
    },
    {
      path: "/components/lists",
      name: "Lists",
      component: Lists,
    },
    {
      path: "/components/menus",
      name: "Menus",
      component: Menus,
    },
    {
      path: "/components/pagination",
      name: "Pagination",
      component: Pagination,
    },
    {
      path: "/components/progress",
      name: "Progress",
      component: Progress,
    },
    {
      path: "/components/snackbars",
      name: "Snackbars",
      component: Snackbars,
    },
    {
      path: "/components/tooltips",
      name: "Tooltips",
      component: Tooltips,
    },
  ],
  component: null,
};

const formsRoutes = {
  id: "Forms",
  path: "/forms",
  icon: <CheckSquare />,
  children: [
    {
      path: "/forms/pickers",
      name: "Pickers",
      component: Pickers,
    },
    {
      path: "/forms/selection-controls",
      name: "Selection Controls",
      component: SelectionCtrls,
    },
    {
      path: "/forms/selects",
      name: "Selects",
      component: Selects,
    },
    {
      path: "/forms/text-fields",
      name: "Text Fields",
      component: TextFields,
    },
    {
      path: "/forms/dropzone",
      name: "Dropzone",
      component: Dropzone,
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors,
    },
  ],
  component: null,
};

const tablesRoutes = {
  id: "Tables",
  path: "/tables",
  icon: <List />,
  children: [
    {
      path: "/tables/simple-table",
      name: "Simple Table",
      component: SimpleTable,
    },
    {
      path: "/tables/advanced-table",
      name: "Advanced Table",
      component: AdvancedTable,
    },
  ],
  component: null,
};

const iconsRoutes = {
  id: "Icons",
  path: "/icons",
  icon: <Heart />,
  children: [
    {
      path: "/icons/material-icons",
      name: "Material Icons",
      component: MaterialIcons,
    },
    {
      path: "/icons/feather-icons",
      name: "Feather Icons",
      component: FeatherIcons,
    },
  ],
  component: null,
};

const chartRoutes = {
  id: "Charts",
  path: "/charts",
  icon: <PieChart />,
  component: Chartjs,
  children: null,
};

const mapsRoutes = {
  id: "Maps",
  path: "/maps",
  icon: <Map />,
  children: [
    {
      path: "/maps/google-maps",
      name: "Google Maps",
      component: GoogleMaps,
    },
    {
      path: "/maps/vector-maps",
      name: "Vector Maps",
      component: VectorMaps,
    },
  ],
  component: null,
};

const presentationRoutes = {
  id: "Presentation",
  path: "/home",
  header: "Docs",
  icon: <Monitor />,
  component: Presentation,
  children: null,
};

const documentationRoutes = {
  id: "Documentation",
  path: "/documentation",
  icon: <BookOpen />,
  children: [
    {
      path: "/documentation/welcome",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/documentation/getting-started",
      name: "Getting Started",
      component: GettingStarted,
    },
    {
      path: "/documentation/environment-variables",
      name: "Environment Variables",
      component: EnvironmentVariables,
    },
    {
      path: "/documentation/deployment",
      name: "Deployment",
      component: Deployment,
    },
    {
      path: "/documentation/theming",
      name: "Theming",
      component: Theming,
    },
    {
      path: "/documentation/state-management",
      name: "State Management",
      component: StateManagement,
    },
    {
      path: "/documentation/support",
      name: "Support",
      component: Support,
    },
  ],
  component: null,
};

const changelogRoutes = {
  id: "Changelog",
  path: "/changelog",
  badge: "v1.2.0",
  icon: <List />,
  component: Changelog,
  children: null,
};

// Site Routes
const siteRoutes = {
  id: "Site",
  path: "/site",
  icon: <Globe />,
  children: [
    {
      path: "/site/main",
      name: "Site List",
      component: site_main,
    },
    {
      path: "/site/admin",
      name: "Site Admin",
      component: site_admin,
    },
  ],
  component: null,
};

const siteAdd = {
  id: "SiteAdd",
  path: "/siteadd/",
  icon: <Monitor />,
  component: site_add,
  children: null,
};

const siteDelete = {
  id: "SiteDelete",
  path: "/sitedelete/:id",
  icon: <Monitor />,
  component: site_delete,
  children: null,
};

const siteEdit = {
  id: "SiteEdit",
  path: "/siteedit/:id",
  icon: <Monitor />,
  component: site_edit,
  children: null,
};

// Spare Admin Routes
const spareAdminRoutes = {
  id: "Spare Admin",
  path: "/spareAdmin",
  icon: <Briefcase />,
  children: [
    {
      path: "/spareAdmin",
      name: "Spare Admin",
      component: spare_admin,
    },
    {
      path: "/comparisonAdmin",
      name: "Comparison Admin",
      component: comparison_admin,
    },
    {
      path: "/rollerAdmin",
      name: "Roller Admin",
      component: roller_admin,
    },
  ],
  component: null,
};

const spareAdd = {
  id: "spareAdd",
  path: "/spareAdd/",
  icon: <Monitor />,
  component: spare_add,
  children: null,
};

const spareDelete = {
  id: "spareDelete",
  path: "/spareDelete/:id",
  icon: <Monitor />,
  component: spare_delete,
  children: null,
};

const spareEdit = {
  id: "spareEdit",
  path: "/spareEdit/:id",
  icon: <Monitor />,
  component: spare_edit,
  children: null,
};

// Comparison Admin Routes
const comparisonAdd = {
  id: "comparisonAdd",
  path: "/comparisonAdd/",
  icon: <Monitor />,
  component: comparison_add,
  children: null,
};

const comparisonDelete = {
  id: "comparisonDelete",
  path: "/comparisonDelete/:id",
  icon: <Monitor />,
  component: comparison_delete,
  children: null,
};

const comparisonEdit = {
  id: "comparisonEdit",
  path: "/comparisonEdit/:id",
  icon: <Monitor />,
  component: comparison_edit,
  children: null,
};

// Roller Admin Routes
const rollerAdd = {
  id: "rollerAdd",
  path: "/rollerAdd/",
  icon: <Monitor />,
  component: roller_add,
  children: null,
};

const rollerDelete = {
  id: "rollerDelete",
  path: "/rollerDelete/:id",
  icon: <Monitor />,
  component: roller_delete,
  children: null,
};

const rollerEdit = {
  id: "rollerEdit",
  path: "/rollerEdit/:id",
  icon: <Monitor />,
  component: roller_edit,
  children: null,
};

const Upload = {
  id: "upload",
  path: "/upload",
  icon: <Monitor />,
  component: upload,
  children: null,
};

// This route is not visisble in the sidebar
const privateRoutes = {
  id: "Private",
  path: "/private",
  component: Blank,
  children: null,
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  cartRoutes,
  siteOrders,
  mainOrders,
  siteRoutes,
  spareAdminRoutes,
  pagesRoutes,
  profileRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  documentationRoutes,
  changelogRoutes,
  presentationRoutes,
  privateRoutes,
  siteDelete,
  siteAdd,
  siteEdit,
  spareAdd,
  spareDelete,
  spareEdit,
  comparisonAdd,
  comparisonDelete,
  comparisonEdit,
  rollerAdd,
  rollerEdit,
  rollerDelete,
  Upload,
];

// Routes using the Auth layout
export const authLayoutRoutes = [authRoutes];

// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  cartRoutes,
  siteOrders,
  mainOrders,
  siteRoutes,
  spareAdminRoutes,
  Upload,
  pagesRoutes,
  profileRoutes,
  projectsRoutes,
  orderRoutes,
  invoiceRoutes,
  tasksRoutes,
  calendarRoutes,
  authRoutes,
  componentsRoutes,
  chartRoutes,
  formsRoutes,
  tablesRoutes,
  iconsRoutes,
  mapsRoutes,
  presentationRoutes,
  documentationRoutes,
  changelogRoutes,
];
