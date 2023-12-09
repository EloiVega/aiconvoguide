'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import logo from '../public/assets/images/logo.svg'
import icon from '../public/assets/icons/link.svg'

import {useState, useEffect} from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const handleProviders = async() => {
      const res = await getProviders();
      setProviders(res);
    }

    handleProviders();
  }, []);

  const signOut = () => {}

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href = "/" className='flex gap-2 flex-center'>
          <Image src = {logo} alt = "AIConvoGuide logo" width = {30} height = {30}/>
          <p className="logo_text">AICovnoGuide</p>
      </Link>


      {/* DESKTOP NAVIGATION */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ?
          <div className = "flex gap-3 md:gap-5">
            <Link href = "/create-prompt" className='black_btn'>
              Create Post
            </Link>

            <button type = "button" onClick = {signOut} className = 'outline_btn'>
              Sign Out
            </button>

            <Link href = "/profile">
              <Image src = {icon} width = {37} height = {37} className = "rounded-full" alt = "profile"/>
            </Link>
          </div>
          : 
          <>
            { providers && 
              Object.values(providers).map((provider) => (
                <button
                  type = "button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className = 'black_btn'
                >
                  Sign In
                </button>
              ))
            }
          </>
        }
      </div>

      {/* MOBILE NAVIGATION */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ?
          <div className="flex">
            <Image 
              src = {icon} 
              width = {37} 
              height = {37} 
              className = "rounded-full" 
              alt = "profile" 
              onClick = {() => {
                setToggleDropDown((prev) => !prev);
                }
              }
            />
            {toggleDropDown && 
              <div className='dropdown'>
                <Link
                  href = "/profile"
                  className='dropdown_link'
                  onClick = {() => setToggleDropDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href = "/create"
                  className='dropdown_link'
                  onClick = {() => setToggleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button 
                  className='mt-5 w-full black_btn'
                  type = "button"
                  onClick={() => {
                    setToggleDropDown(false)
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            }
          </div>
          : <>
            { providers && 
              Object.values(providers).map((provider) => (
                <button
                  type = "button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className = 'black_btn'
                >
                  Sign In
                </button>
              ))
            }
          </>
        }
      </div>
    </nav>
  )
}

export default Nav