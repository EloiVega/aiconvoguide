import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className="head_text text-center flex flex-col">
        Discover & share
        <br className = "max-md:hidden"/>
        <span className="blue_gradient2 text-center">AI-Powered Prompts</span>
      </h1>
      <p class = "desc text-center">
        AiCovnoGuide is an open-source AI-prompting tool 
        for modern world to discover, create and share 
        creative prompts.
      </p>

      <Feed></Feed>
    </section>
  )
}

export default Home