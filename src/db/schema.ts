import { relations } from "drizzle-orm"
import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const userTable = pgTable("users", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	username: text().unique(),
	email: text().unique(),
	password: text().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
})

export const categoryTable = pgTable("category", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	slug: text().notNull().unique(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
})

export const categoryRelations = relations(categoryTable, ({ many }) => ({
	products: many(productsTable),
}))

export const productsTable = pgTable("products", {
	id: uuid().primaryKey().defaultRandom(),
	name: text().notNull(),
	slug: text().notNull().unique(),
	description: text().notNull(),
	categoryId: uuid("category_id").references(() => categoryTable.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
})

export const colorsEnum = pgEnum("color", [
	"preto",
	"branco",
	"vermelho",
	"verde",
	"azul",
	"amarelo",
	"laranja",
	"roxo",
	"rosa",
	"lilas",
	"marrom",
	"cinza",
])
export const sizesEnum = pgEnum("size", ["small", "medium", "large", "extraLarge"])

export const productVariantTable = pgTable("product_variant", {
	id: uuid().primaryKey().defaultRandom(),
	productId: uuid("product_id").references(() => productsTable.id),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	color: text("color").notNull(),
	priceInCents: integer("price_in_cents").notNull(),
	imageUrl: text("image_url").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
})

export const productsRelation = relations(productsTable, ({ one }) => ({
	category: one(categoryTable, {
		fields: [productsTable.categoryId],
		references: [categoryTable.id],
	}),
}))
