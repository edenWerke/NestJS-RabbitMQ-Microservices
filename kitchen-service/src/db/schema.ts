// 
import { pgTable,uuid,timestamp,integer,varchar } from "drizzle-orm/pg-core";
export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  customerName: varchar("customer_name", { length: 100 }).notNull(),
item:varchar('item',{length:100}).notNull(),
quantity:integer('quantity').notNull(),
status:varchar('status',{length:50}).notNull().default('pending')

});
export type Order=typeof orders.$inferSelect;
export type NewOrder=typeof orders.$inferInsert;