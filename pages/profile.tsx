import React from 'react'
import Layout from "@/components/Layout";
import Image from "next/image";
import Bannerimg from "../public/banner.jpg";

const profile = () => {
  return (
    <>
      <Layout />
      <div>
        <Image className="" src={Bannerimg} alt="banner" />
      </div>
    </>
  )
}

export default profile;