import React from "react";
import { Fragment, Component } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../Context/UserContext";
import axios from "axios";
import { useState, useEffect } from "react";

const user = {
  name: "",
  email: "@test.com",
  imageUrl:
    "https://www.eluniversal.com.mx/sites/default/files/2019/11/04/ques-es-un-bot.jpg",
};
const navigation = [
  { name: "Inicio", href: "/proyectoweb/#/DashAdmin", current: false },
  { name: "My Posts", href: "/proyectoweb/#/DashAdmin/Product", current: false },
  {
      name: "Add New Post",
      href: "/proyectoweb/#/DashAdmin/addProduct",
      current: true,
  },
  { name: "Favoritos", href: "/proyectoweb/#/DashAdmin/Favoritos", current: false},
];
const userNavigation = [{ name: "Sign out", href: "#" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const AddProduct = () => {
  const navigate = useNavigate();
  const context = useUserContext();

  const logout = async (e) => {
    e.preventDefault();
    try {
      const response = await context.logout();
      navigate("/"); //Esto no se como lo hace se puede cambiar
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  /*async function onSubmit(e) {
    e.preventDefault();

    const formPost = new FormData(e.target);

    const body = Object.fromEntries(formPost.entries());

    if (body.title === '' || body.dexcription === '') return alert('fill the squares');

    const response = await axios.post('https://posts-pw2021.herokuapp.com/api/v1/post/create', { ...body, active: body.active === 'on' }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    console.log(response);
  }*/

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [who, setWho] = useState();

  useEffect(() => {
    async function getWho() {
        const { data } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/auth/whoami', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        setWho(data.username);
    }

    getWho();
}, []);

  const onChange = (e, save) => {
    save(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await context.verify(titulo);
      console.log(titulo);
      console.log(descripcion);
      console.log(response["results"][0]["background_image"]);

      const token = localStorage.getItem("token");
      const img = response["results"][0]["background_image"];

      fetch("https://posts-pw2021.herokuapp.com/api/v1/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            `Bearer ${token}`,
        },
        body: `title=${titulo}&description=${descripcion}&image=${img}`,
      })
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-indigo-500">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://user-images.githubusercontent.com/62577396/143792370-db8fffb6-e91a-4255-83da-8265025e4beb.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-indigo-600 text-white"
                              : "text-gray-300 hover:bg-indigo-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={() => {
                            console.log("estoy presionando -> " + item.name)
                            if (item.name == "Add New Post") {
                              navigate("/DashAdmin/addProduct");
                            } if (item.name == "Inicio") {
                              navigate("/DashAdmin");
                            } if (item.name == "My Posts") {
                              navigate("/DashAdmin/Product");
                            } if (item.name == "Favoritos") {
                              navigate("/DashAdmin/Favoritos");
                            }
                          }}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-indigo-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                  onClick={logout}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {who}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400 mt-2">
                      {who + user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-indigo-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-indigo-600">Add New Post</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
              <div>
                <div className="md:grid md:grid-cols-2 md:gap-6">
                  <div className="mt-5 md:mt-0 md:col-span-2">
                    <form action="#" method="POST" onSubmit={onSubmit}>
                      <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-3 sm:col-span-2">
                              <label
                                htmlFor="company-website"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Nombre
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <input
                                  type="text"
                                  name="company-website"
                                  id="company-website"
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  placeholder="Call of Duty"
                                  onChange={(e) => onChange(e, setTitulo)}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Descripcion
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor you@example.com"
                                defaultValue={""}
                                onChange={(e) => onChange(e, setDescripcion)}
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                              Brief description of the product. URLs are
                              hyperlinked.
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
};
