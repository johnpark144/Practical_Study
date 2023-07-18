export default {
  name: 'featured',
  type: 'document',
  title: 'Featured Menu categories',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured Categories name',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule: any) => Rule.max(200),
    },
    {
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    },
  ],
}
