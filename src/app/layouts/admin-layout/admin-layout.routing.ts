import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ClientComponent } from "src/app/components/client/client.component";
import { CompteComponent } from "src/app/components/compte/compte.component";
import { CompteAllComponent } from "src/app/components/compte-all/compte-all.component";
import { NotfoundComponent } from "src/app/components/notfound/notfound.component";
import { AppointmentComponent } from "src/app/components/appointment/appointment.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "appointments", component : AppointmentComponent },
  { path: "compte-all", component: CompteAllComponent },
  { path: "compte", component: CompteComponent },
  { path: "client", component: ClientComponent  },
  

  // { path: "dashboard", component: DashboardComponent },
  // { path: "icons", component: IconsComponent },
  // { path: "maps", component: MapComponent },
  // { path: "notifications", component: NotificationsComponent },
  // { path: "user", component: UserComponent },
  // { path: "tables", component: TablesComponent },
  // { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];
