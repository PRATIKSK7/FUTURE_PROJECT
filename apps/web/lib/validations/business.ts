import * as z from "zod"

export const businessInfoSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  category: z.string().min(2, "Category is required"),
  location: z.string().min(2, "Location is required"),
  website: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
})

export const brandIdentitySchema = z.object({
  mission: z.string().min(10, "Mission is required"),
  vision: z.string().min(10, "Vision is required"),
  usp: z.string().min(10, "USP is required"),
  story: z.string().optional(),
  voice: z.string().min(2, "Brand voice is required"),
})

export const targetAudienceSchema = z.object({
  customerTypes: z.string().min(2, "Customer types are required"),
  ageGroups: z.string().min(2, "Age groups are required"),
  budgetRange: z.string().min(2, "Budget range is required"),
  preferences: z.string().min(5, "Preferences are required"),
  painPoints: z.string().min(5, "Pain points are required"),
  goals: z.string().min(5, "Customer goals are required"),
})

export const seoInfoSchema = z.object({
  primaryKeywords: z.string().min(2, "Primary keywords are required"),
  secondaryKeywords: z.string().optional(),
  serviceAreas: z.string().min(2, "Service areas are required"),
  languages: z.string().min(2, "Languages are required"),
})
