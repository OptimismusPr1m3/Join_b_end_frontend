const STORAGE_TOKEN = "4IQMVEDAS02VQ4EJLUVFCEPW7G87BF8LMGK1KYF7";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

const BACKEND_URL = "https://adioz1337.pythonanywhere.com/api/";

/**
 * Sets and saves an item in the remote storage using a key-value pair.
 *
 * @param {string} key - The key to associate with the item in storage.
 * @param {string} value - The value to store in the remote storage.
 * @returns {Promise} A promise that resolves with the result of the remote storage operation.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * Retrieves an item from the remote storage using a key.
 *
 * @param {string} key - The key associated with the item to retrieve from storage.
 * @returns {Promise} A promise that resolves with the retrieved item's value or rejects with an error message.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with "${key}".`;
    });
}

/**
 * Fetches and loads contact data from remote storage into the 'contacts' variable.
 * If the data does not exist, it handles and logs an error.
 */
async function fetchContacts2() {
  try {
    contacts = JSON.parse(await getItem("contacts"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function fetchContacts() {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `Token ${token}`);
  await fetch(`${BACKEND_URL}contacts/`, {
    method: "GET",
    headers: headers,
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => (contacts = JSON.parse(result)))
    .then(() => console.log(contacts))
    .catch((error) => console.error(error));
}

async function setContact(contact) {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Token ${token}`);
  const raw = JSON.stringify(contact);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };
  try {
    await fetch(BACKEND_URL + "contacts/", requestOptions);
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(contact, URL) {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Token ${token}`);
  const raw = JSON.stringify(contact);
  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: raw,
    redirect: "follow",
  };
  try {
    fetch(URL, requestOptions);
  } catch (error) {
    console.log(error);
  }
}

async function delContact(contactURL) {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `Token ${token}`);
  fetch(contactURL, { method: "DELETE", headers: headers, redirect: "follow" })
    .then((response) => response.text())
    .then(() => init("contactsSection"))
    .catch((error) => console.error(error));
}

/**
 * Fetches and loads user data from remote storage into the 'users' variable.
 * If the data does not exist, it handles and logs an error.
 */
async function fetchUsers2() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function fetchUsers() {
  //token = await localStorage.getItem('token')
  // const headers = new Headers();
  // headers.append("Authorization", `Token ${token}`)
  await fetch(`${BACKEND_URL}users/`, { method: "GET", redirect: "follow" })
    .then((response) => response.text())
    .then((result) => (users = JSON.parse(result)))
    .then(() => console.log(users))
    .catch((error) => console.error(error));
}

async function createUser(user) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };
  try {
    fetch(BACKEND_URL + "users/register/", requestOptions);
  } catch (error) {
    consolelog(error);
  }
}

/**
 * Fetches and loads task data from remote storage into the 'tasks' variable.
 * If the data does not exist, it handles and logs an error.
 */
// async function fetchTasks2() {
//   try {
//     tasks = JSON.parse(await getItem("tasks"));
//   } catch (e) {
//     console.error("Loading error:", e);
//   }
// }

async function fetchTasks() {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `Token ${token}`);
  await fetch(BACKEND_URL + "tasks/", {
    method: "GET",
    headers: headers,
    redirect: "follow",
  })
    .then((response) => response.text())
    .then((result) => (tasks = JSON.parse(result)))
    .then(() => console.log(tasks))
    .catch((error) => console.error(error));
}

async function setTask(task) {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Token ${token}`);
  const raw = JSON.stringify(task);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
    redirect: "follow",
  };
  try {
    await fetch(BACKEND_URL + "tasks/", requestOptions);
  } catch (error) {
    console.log(error);
  }
}

async function updateTask(task, URL) {
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Token ${token}`);
  const raw = JSON.stringify(task);
  const requestOptions = {
    method: "PUT",
    headers: headers,
    body: raw,
    redirect: "follow",
  };
  try {
    await fetch(URL, requestOptions);
  } catch (error) {
    console.log(error);
  }
}

async function delTask(taskIndex) {
  let taskURL;
  token = await localStorage.getItem("token");
  const headers = new Headers();
  headers.append("Authorization", `Token ${token}`);
  tasks.forEach((task) => {
    if (task.uniqueIndex == taskIndex) {
      taskURL = task.url;
    }
  });
  console.log(taskURL);
  fetch(taskURL, { method: "DELETE", headers: headers, redirect: "follow" })
    .then((response) => response.text())
    .then(() => initBoard("board"), closeTask())
    .catch((error) => console.error(error));
}

// DELETE CONTENT
/**
 * Deletes all saved users at the server
 */
async function deleteAllUsers() {
  let users = [];
  await setItem("users", JSON.stringify(users));
}

/**
 * Deletes all saved contacts at the server
 */
async function deleteAllContacts() {
  let contacts = [];
  await setItem("contacts", JSON.stringify(contacts));
}

/**
 * Deletes all saved tasks at the server
 */
async function deleteAllTasks() {
  let tasks = [];
  await setItem("tasks", JSON.stringify(tasks));
}
