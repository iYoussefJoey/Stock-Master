import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth-layouts-comps/login/login.component';
import { HomePageComponent } from './components/main-layout-components/home-page/home-page.component';
import { AuthLayoutComponent } from './components/auth-layouts-comps/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './components/main-layout-components/main-layout/main-layout.component';
import { BasicSettingsComponent } from './components/main-layout-components/basic-settings/basic-settings.component';
import { ReceivingManagementComponent } from './components/main-layout-components/receiving-management/receiving-management.component';
import { StatisticAnalysisComponent } from './components/main-layout-components/statistic-analysis/statistic-analysis.component';
import { WarehouseWorkingComponent } from './components/main-layout-components/warehouse-working/warehouse-working.component';
import { DeliveryManagementComponent } from './components/main-layout-components/delivery-management/delivery-management.component';
import { VisualWarehouseComponent } from './components/main-layout-components/visual-warehouse/visual-warehouse.component';
import { CompanyInformationComponent } from './components/main-layout-components/basic-settings/company-information/company-information.component';
import { UserRoleComponent } from './components/main-layout-components/basic-settings/user-role/user-role.component';
import { PermissionSettingsComponent } from './components/main-layout-components/basic-settings/permission-settings/permission-settings.component';
import { UsermanagementComponent } from './components/main-layout-components/basic-settings/usermanagement/usermanagement.component';
import { CommodityCategoryComponent } from './components/main-layout-components/basic-settings/commodity-category/commodity-category.component';
import { CommodityManagementComponent } from './components/main-layout-components/basic-settings/commodity-management/commodity-management.component';
import { SupplierInfoComponent } from './components/main-layout-components/basic-settings/supplier-info/supplier-info.component';
import { WarehouseSettingComponent } from './components/main-layout-components/basic-settings/warehouse-setting/warehouse-setting.component';
import { OwnerInformationComponent } from './components/main-layout-components/basic-settings/owner-information/owner-information.component';
import { FreightSettingComponent } from './components/main-layout-components/basic-settings/freight-setting/freight-setting.component';
import { CustomerInformationComponent } from './components/main-layout-components/basic-settings/customer-information/customer-information.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: AuthLayoutComponent, // Use AuthLayout for login
    children: [{ path: '', component: LoginComponent }],
  },

  {
    path: '',
    component: MainLayoutComponent, // Sidebar and navbar for main pages
    children: [
      {
        path: 'home',
    component: HomePageComponent,
    data: { breadcrumb: 'breadcrumb.home' },
  },
  {
    path: 'basicsettings',
    component: BasicSettingsComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings' },
  },
  {
    path: 'staticAnalysis',
    component: StatisticAnalysisComponent,
    data: { breadcrumb: 'breadcrumb.staticAnalysis' },
  },
  {
    path: 'wareHouseWorking',
    component: WarehouseWorkingComponent,
    data: { breadcrumb: 'breadcrumb.warehouseWorking' },
  },
  {
    path: 'deliveryManagement',
    component: DeliveryManagementComponent,
    data: { breadcrumb: 'breadcrumb.deliveryManagement' },
  },
  {
    path: 'recievingManagement',
    component: ReceivingManagementComponent,
    data: { breadcrumb: 'breadcrumb.receivingManagement' },
  },
  {
    path: 'visualWarehouse',
    component: VisualWarehouseComponent,
    data: { breadcrumb: 'breadcrumb.visualWarehouse' },
  },
  {
    path: 'companyInfo',
    component: CompanyInformationComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.companyInfo' },
  },
  {
    path: 'userRole',
    component: UserRoleComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.userRole' },
  },
  {
    path: 'permissonSettings',
    component: PermissionSettingsComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.permissionSettings' },
  },
  {
    path: 'usermanagement',
    component: UsermanagementComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.userManagement' },
  },
  {
    path: 'commoditycategory',
    component: CommodityCategoryComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.commodityCategory' },
  },
  {
    path: 'commditymanagement',
    component: CommodityManagementComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.commodityManagement' },
  },
  {
    path: 'supplierinfo',
    component: SupplierInfoComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.supplierInfo' },
  },
  {
    path: 'warehousesetting',
    component: WarehouseSettingComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.warehouseSetting' },
  },
  {
    path: 'ownerinformation',
    component: OwnerInformationComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.ownerInformation' },
  },
  {
    path: 'freightsetting',
    component: FreightSettingComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.freightSettings' },
  },
  {
    path: 'customerinformation',
    component: CustomerInformationComponent,
    data: { breadcrumb: 'breadcrumb.basicSettings.customerInformation' },
      },
    ],
  },

  { path: '**', redirectTo: '/login', pathMatch: 'full' }, // Redirect any unknown path to login
];
