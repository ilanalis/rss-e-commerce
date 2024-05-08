import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const scopes = [
  'view_payments:online-store-dds',
  'view_standalone_prices:online-store-dds',
  'view_connectors:online-store-dds',
  'view_project_settings:online-store-dds',
  'view_discount_codes:online-store-dds',
  'view_products:online-store-dds',
  'view_customers:online-store-dds',
  'view_connectors_deployments:online-store-dds',
  'view_tax_categories:online-store-dds',
  'view_business_units:online-store-dds',
  'view_attribute_groups:online-store-dds',
  'view_cart_discounts:online-store-dds',
  'view_customer_groups:online-store-dds',
  'view_audit_log:online-store-dds',
  'view_order_edits:online-store-dds',
  'view_messages:online-store-dds',
  'view_shopping_lists:online-store-dds',
  'view_staged_quotes:online-store-dds',
  'view_orders:online-store-dds',
  'view_import_containers:online-store-dds',
  'view_categories:online-store-dds',
  'view_quotes:online-store-dds',
  'view_shipping_methods:online-store-dds',
  'view_sessions:online-store-dds',
  'view_states:online-store-dds',
  'view_associate_roles:online-store-dds',
  'view_types:online-store-dds',
  'view_quote_requests:online-store-dds',
  'view_product_selections:online-store-dds',
  'view_key_value_documents:online-store-dds',
  'view_published_products:online-store-dds',
  'view_stores:online-store-dds',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_HOST,
  projectKey: import.meta.env.VITE_PROJECT_KEY,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_HOST,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
