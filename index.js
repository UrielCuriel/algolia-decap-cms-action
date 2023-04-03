const core = require("@actions/core");
const github = require("@actions/github");
const algoliasearch = require("algoliasearch");
const fs = require("fs");
const { parse } = require("yaml");

/**
 * Read the md file and return the header (YAML front matter) content
 * @param {string} path
 * @returns {any}
 * @example
 * const header = getHeaderContent("path/to/file.md");
 * console.log(header);
 * // { title: "My title", description: "My description" }
 */
function getHeaderContent(path, basePath) {
  const content = fs.readFileSync(`${basePath}/${path}`);
  const rawHeader = content.toString().split("---")[1];
  const header = parse(rawHeader);
  return { objectID: path, ...header };
}

/**
 * read the workspace subfolder and return the list of files
 * @param {string} path
 * @returns {string[]}
 * @example
 * const files = getFiles("path/to/folder");
 * console.log(files);
 * // [ "file1.md", "file2.md" ]
 */
function getFiles(path, basePath) {
  const files = fs.readdirSync(`${basePath}/${path}`);
  return files;
}

try {
  const algoliaAppId = core.getInput("algolia_app_id");
  const algoliaAdminApiKey = core.getInput("algolia_admin_api_key");
  const algoliaIndexName = core.getInput("algolia_index_name");
  const collection_path = core.getInput("collection_path");
  const basePath = process.env.GITHUB_WORKSPACE;
  const client = algoliasearch(algoliaAppId, algoliaAdminApiKey);
  const index = client.initIndex(algoliaIndexName);

  const files = getFiles(collection_path, basePath);
  const records = files.map((file) => getHeaderContent(file, basePath));
  await index.saveObjects(records);
  core.setOutput("records", records);
} catch (error) {
  core.setFailed(error.message);
}
