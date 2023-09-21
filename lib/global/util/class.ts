export default function Class(obj: any) {
  try {
    new (new Proxy(obj, { construct: () => ({}) }));

    if (!Object.getOwnPropertyNames(obj).includes('arguments')) throw new Error("");
      
    return true;
  } catch (err) {
    return false;
  }
};