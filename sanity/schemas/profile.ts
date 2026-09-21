export default {
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio (VI)',
      type: 'text',
    },
    {
      name: 'bio_en',
      title: 'Bio (EN)',
      type: 'text',
    },
    {
      name: 'university',
      title: 'University',
      type: 'string',
    },
    {
      name: 'major',
      title: 'Major',
      type: 'string',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    },
  ],
};
