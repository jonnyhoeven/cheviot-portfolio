import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const tArr = ['Blog', 'Achievements', 'Career', 'Projects']

const icons = [
  'mdi:codepen',
  'fa-brands:node-js',
  'mdi:language-php',
  'la:python',
  'mdi:google',
  'simple-icons:popos',
  'mdi:github',
  'simple-icons:webstorm',
  'tabler:brand-google-big-query',
  'octicon:copilot-48',
  'mdi:ssh',
  'mdi:kubernetes',
  'mdi:ansible',
  'simple-icons:selenium',
  'fa-brands:vuejs',
  'file-icons:nuxt',
  'simple-icons:googlecolab',
  'mdi:react',
  'mdi:firebase',
  'mdi:npm',
  'la:yarn',
  'akar-icons:postgresql-fill',
  'simple-icons:elasticsearch',
  'devicon-plain:mysql',
  'devicon-plain:docker',
  'mdi:aws',
  'simple-icons:apache',
  'mdi:gnome',
  'material-symbols:android',
  'simple-icons:bunq'
]

const p = (lenght = 4) => faker.lorem.paragraphs(lenght)

const fakePostTypes = () =>
  tArr.map(t => ({
    slug: faker.helpers.slugify(t).toLowerCase(),
    published: true,
    title: t,
    color: faker.internet.color(),
    icon: faker.lorem.word(),
    subtitle: faker.lorem.sentence(),
    intro: p(4),
    content: p(10),
    createdAt: faker.date.past(),
    posts: { create: fakePosts() }
  }))

const fakeBadges = (length = 3) =>
  Array.from({ length }).map((_k, i) => {
    const title = faker.lorem.words(2)

    return {
      slug: faker.helpers.slugify(title).toLowerCase() + faker.datatype.uuid(),
      published: faker.datatype.boolean(),
      frontpage: faker.datatype.boolean(),
      title,
      icon: faker.helpers.arrayElement(icons),
      color: faker.internet.color(),
      borderColor: faker.internet.color(),
      textColor: faker.internet.color(),
      subtitle: faker.lorem.sentence(),
      intro: p(3),
      content: p(7),
      imageUrl: faker.image.imageUrl(),
      imageAlt: faker.lorem.sentence(),
      linkUrl: faker.internet.url(),
      linkLabel: faker.lorem.sentence(),
      createdAt: faker.date.past()
    }
  })

const fakePosts = (length = 10) =>
  Array.from({ length }).map((_k, i) => {
    const title = faker.lorem.sentence()

    return {
      slug: faker.helpers.slugify(title).toLowerCase() + faker.datatype.uuid(),
      published: faker.datatype.boolean(),
      frontpage: faker.datatype.boolean(),
      title,
      subtitle: faker.lorem.sentence(),
      intro: p(3),
      content: p(6),
      imageUrl: faker.image.imageUrl(),
      imageAlt: faker.lorem.sentence(),
      linkUrl: faker.internet.url(),
      linkLabel: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      badges: {
        create: fakeBadges()
      }
    }
  })

const menuItems = [
  { order: 0, link: '/', title: 'Home' },
  { order: 1, link: '/posts', title: 'All posts' },
  { order: 2, link: '/posts/blog', title: 'Blog' },
  { order: 2, link: '/posts/career', title: 'Career' },
  { order: 3, link: '/posts/achievements', title: 'Achievements' },
  { order: 4, link: '/posts/projects', title: 'Projects' },
  { order: 6, link: '/trpc', title: 'trpc' },
  { order: 5, link: '/contact', title: 'Contact' }
]

const globalSettings = [
  { key: 'title', value: 'Jonny van der Hoeven' },
  { key: 'base_url', value: '/' },
  { key: 'nav_logo_url', value: '/logo.svg' },
  { key: 'nav_logo_alt', value: 'JH logo' },
  { key: 'contact_title', value: 'Contact' },
  {
    key: 'contact_content',
    value:
      "If you're interested in learning more about how I can contribute to your organization or discuss potential job opportunities, please feel free to reach out via email or LinkedIn. As a highly motivated and adaptable professional, I welcome the chance to connect with fellow industry professionals and explore exciting new possibilities together. Thank you for considering reaching out, and I look forward to hearing from you soon."
  },
  { key: 'contact_email_label', value: 'Your email' },
  { key: 'contact_email_placeholder', value: 'yourname@gmail.com' },
  { key: 'contact_subject_label', value: 'Subject' },
  {
    key: 'contact_subject_placeholder',
    value: 'Let me know if you have any questions'
  },
  { key: 'contact_message_label', value: 'Your message' },
  { key: 'contact_message_placeholder', value: 'Leave a comment...' },
  { key: 'contact_button_label', value: 'Send message' }
]

async function main () {
  const fakeTypes = fakePostTypes()

  for await (const type of fakeTypes) {
    const res = await prisma.postType.create({
      data: type
    })
    // eslint-disable-next-line no-console
    console.log(res)
  }

  for await (const item of menuItems) {
    const res = await prisma.menuItem.create({
      data: item
    })
    // eslint-disable-next-line no-console
    console.log(res)
  }

  for await (const globalSetting of globalSettings) {
    const res = await prisma.globalSetting.create({
      data: globalSetting
    })
    // eslint-disable-next-line no-console
    console.log(res)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
