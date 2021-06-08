interface School {
  id: number,
  name: string,
}

interface Klass {
  id: number,
  name: string,
  level: string,
  section: number,
  program: string,
  school_id: number,
}

interface Dict {
  id: number,
  key: string,
  name: string,
  school_id?: number,
}

interface User {
  id: nubmer,
  bio: string,
  role: string,
  name: string,
  email: string,
  major: string,
  avatar: string,
  gender: 0 | 1 | 2,
  tiktok: string,
  twitter: string,
  facebook: string,
  snapchat: string,
  linkedin: string,
  instagram: string,
  graduate: number,
  birthday: string,
  school_id: number,
}

interface Hash {
  [x: string]: string,
}
