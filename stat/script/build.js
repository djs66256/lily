
import {BuildEventIOS, BuildPageIOS, Build} from './build-template'

export async function build(rootNode, basedir) {
  if (!rootNode) throw new Error('rootNode can not be null')
  let _ = await rootNode.loadDirNodes()
  for (let dirNode of rootNode.dirs) {
    if (dirNode.id === 'page') {
      let builder = new BuildPageIOS({node: dirNode, basedir})
      await builder.build()
    }
    else if (dirNode.id === 'event') {
      let builder = new BuildEventIOS({node: dirNode, basedir})
      await builder.build()
    }
    else {

    }
  }
}
