import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const tArr = ['Blog', 'Achievements', 'Career', 'Projects']

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

const fakePosts = (length = 10) =>
  Array.from({ length }).map((_k, _i) => {
    const title = faker.lorem.sentence()

    return {
      slug: faker.helpers.slugify(title).toLowerCase() + faker.string.uuid(),
      published: faker.datatype.boolean(),
      frontpage: faker.datatype.boolean(),
      title,
      subtitle: faker.lorem.sentence(),
      intro: p(3),
      content: p(6),
      imageUrl: faker.image.url(),
      imageAlt: faker.lorem.sentence(),
      linkUrl: faker.internet.url(),
      linkLabel: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      user: {
        connectOrCreate: {
          where: { email: 'jonny@justme.dev' },
          create: {
            email: 'jonny@justme.dev',
            role: 'ADMIN',
            name: 'Jonny',
            active: true
          }
        }
      }
    }
  })

const menuItems = [
  { order: 0, link: '/', title: 'Home' }
]

const globalSettings = [
  { key: 'title', value: 'JustMe.dev' },
  { key: 'base_url', value: '/' }
]

async function main () {
  const fakeTypes = fakePostTypes()

  for await (const type of fakeTypes) {
    await prisma.postType.create({
      data: type
    })
  }

  for await (const item of menuItems) {
    await prisma.menuItem.create({
      data: item
    })
  }

  for await (const globalSetting of globalSettings) {
    await prisma.globalSetting.create({
      data: globalSetting
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  }).finally(async () => {
    await prisma.$disconnect()
  })
