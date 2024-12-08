export async function generateMetadata({ params }) {
  const { slug } = params
  console.log('Slug received:', slug) // Debugging slug yang diterima

  try {
    const response = await fetch(`http://localhost:8000/api/blogs/${slug}`)
    const blogData = await response.json()
    console.log('Fetched blog data:', blogData) // Debugging hasil fetch

    const previousBlogSlug = (parseInt(slug) - 1).toString()
    const nextBlogSlug = (parseInt(slug) + 1).toString()

    return {
      props: {
        blogData,
        previousBlogSlug,
        nextBlogSlug,
      },
    }
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return {
      props: {
        blogData: null,
        previousBlogSlug: null,
        nextBlogSlug: null,
      },
    }
  }
}
