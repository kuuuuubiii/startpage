/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {}
const engine = "duckduckgo"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"DSujzRKPfSWUDSDF","label":"Lboro","bookmarks":[{"id":"bIHaEDJWx2H40wwi","label":"Learn","url":"https://learn.lboro.ac.uk/"},{"id":"gdQClxlbZxdxqGUW","label":"Timetable","url":"https://lucas.lboro.ac.uk/its_apx/f?p=student_timetable"},{"id":"6IAT8BSNk7sGZMU0","label":"Email","url":"https://outlook.office365.com/mail/"},{"id":"pjwTHx1WCD21jVL0","label":"Remote Access","url":"https://www.lboro.ac.uk/services/it/topics/student-remote-access/"}]},{"id":"HvjaXLIrPftYy0VB","label":"News","bookmarks":[{"id":"ZVqLh0B068F47mOq","label":"FT","url":"https://www.ft.com/"},{"id":"tfkQuTfeWExH3jts","label":"inews","url":"https://inews.co.uk/"},{"id":"G53FPcQPQMHeWwYn","label":"Politico","url":"https://www.politico.eu/uk/"},{"id":"beZQfLDym1fOU0ca","label":"Guardian","url":"https://www.theguardian.com/uk"}]},{"id":"gzYZfUK0HLZC4eIM","label":"Misc","bookmarks":[{"id":"R3VpPju2bjUeAu7d","label":"Office365","url":"https://www.office.com/"},{"id":"d1MdRqOAj0Un3zMY","label":"Amazon","url":"https://www.amazon.co.uk/"},{"id":"cMn6JSQ4CpWrHCeB","label":"Twitter","url":"https://twitter.com/?lang=en-gb"},{"id":"fTUBeJwb4bOfNBcQ","label":"Youtube","url":"https://www.youtube.com/?gl=GB&hl=en-GB"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
