export default {
  getRecipes: async (repoName) => {
    const
      url = `https://raw.githubusercontent.com/${repoName}/master/PODS.json`,
      res = await fetch(url)
    
    return await res.json()
  }
}