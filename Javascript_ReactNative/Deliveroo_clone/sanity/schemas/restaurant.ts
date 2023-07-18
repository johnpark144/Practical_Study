export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Restaurant name',
      validation: (Rule: any) => Rule.required(), // 무조건 포함 되야 하는 항목
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule: any) => Rule.max(200), // 200자 이내로
    },
    {
      name: 'image',
      type: 'image', // 이미지 첨부 가능
      title: 'Image of the Restraurant',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restraurant',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Latitude of the Restraurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Restaurant address',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5 Stars)',
      validation: (Rule: any) =>
        Rule.required().min(1).max(5).error('Please enter a Valur between 1 and 5'), // 최소 1 최대 5까지 가능, 에러메세지
    },
    {
      name: 'type',
      type: 'reference',
      title: 'Category',
      validation: (Rule: any) => Rule.required(),
      to: [{type: 'category'}], // category 라는 파일을 세부 스키마로 지정
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}], // 배열 필드에서 사용(여러 개 타입 나열가능)  // dish 라는 파일을 세부 스키마로 지정
    },
  ],
}
