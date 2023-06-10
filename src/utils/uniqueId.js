import { v4 as uuidv4 } from 'uuid';

const uniqueId = () => {
  const id = uuidv4();

  return id.slice(0,8).toString(36) + Date.now().toString(36);
}

export {
  uniqueId
};
