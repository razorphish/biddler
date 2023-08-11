module.exports = {
  onPreBuild: ({ utils }) => {
    const currentSite = process.env.SITE_NAME;
    const lastDeployedCommit = process.env.CACHED_COMMIT_REF;
    const latestCommit = 'HEAD';
    const projectHasChanged = projectChanged(
      currentSite,
      lastDeployedCommit,
      latestCommit
    );
    if (!projectHasChanged) {
      utils.build.cancelBuild(
        `Build was cancelled because ${currentSite} was not affected by the latest changes ${JSON.stringify(process.env)}`
      );
    }
  }
};

function projectChanged(currentSite, fromHash, toHash) {
  const execSync = require('child_process').execSync;
  const getAffected = `yarn --silent nx print-affected --base=${fromHash} --head=${toHash}`;
  const output = execSync(getAffected).toString();
  //get the list of changed projects from the output
  const changedProjects = JSON.parse(output).projects;
  if (changedProjects.find(project => project === currentSite)) {
    return true;
  } else {
    return false;
  }
}