import Locks from './Locks';
import Presale from './Presale';
import Project from './Project';

export const tabTitles = [{
  title: 'Project',
  key: 'project',
},{
  title: 'Presale',
  key: 'presale',
},{
  title: 'Locks',
  key: 'locks',
},
]

export const tabs = {
  project: <Project />,
  presale: <Presale />,
  locks: <Locks />
}