import React from "react";
import { useAuth } from "../contexts/AuthContext";
import config from "../configs/config.json";
import axios from "axios";
import profile from "../assets/images/default_profile.png";
import Spinner from "../components/Spinner";

function Profile() {
  const auth = useAuth();
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  let role = "";
  if (auth.currentRole === "Mahasiswa") {
    role = "mahasiswa";
  } else if (auth.currentRole === "Dosen") {
    role = "dosen";
  } else if (auth.currentRole === "Operator") {
    role = "operator";
  } else if (auth.currentRole === "Departemen") {
    role = "departemen";
  }

  const getProfile = async () => {
    setIsLoading(true);
    const apiUrl = config.API_URL;
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${apiUrl}/${role}/profile`;

      const response = await axios.get(url, {
        headers: {
          "x-access-token": token,
        },
      });
      const result = Object.keys(response.data.data).map((item) => {
        let key = item.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
        if (key.toLowerCase() === "nama prov") {
          key = "Provinsi";
        } else if (key.toLowerCase() === "nama kab") {
          key = "Kabupaten/kota";
        } else {
          key = key.charAt(0).toUpperCase() + key.slice(1);
        }

        if (key.split(" ")[0].length === 3) {
          key = key.split(" ")[0].toUpperCase();
          if (key.split(" ").length > 1) {
            key += " " + key.split(" ")[1];
          }
        }
        return {
          key,
          value: response.data.data[item],
        };
      });
      setData(result);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return isLoading || !data ? (
    <div className="h-full flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <div className="my-5">
      <h1 className="text-center text-2xl font-bold">
        Profile {auth.currentRole === "Mahasiswa" ? "Mahasiswa" : "Dosen"}
      </h1>
      <section className="flex justify-center items-center gap-x-10 mt-20">
        <img
          src={
            auth.foto !== null &&
            auth.foto !== "undefined" &&
            auth.foto !== "null"
              ? auth.foto.includes("http")
                ? auth.foto
                : `${config.API_IMAGE_URL}/foto_mhs/${auth.foto}`
              : profile
          }
          alt="foto profil"
          className="rounded-lg w-36 h-w-36 object-cover"
        />
        <div>
          <div className="flex">
            <p className="font-bold w-[200px]">Nama</p>
            <p className="mr-2">:</p>
            <p>{auth.name}</p>
          </div>
          <div className="flex">
            <p className="font-bold w-[200px]">
              {auth.currentRole === "Mahasiswa" ? "NIM" : "NIP"}{" "}
            </p>
            <p className="mr-2">:</p>
            <p>{auth.id}</p>
          </div>
          {data.map((item, index) => {
            return (
              item.key !== "Foto" && (
                <div className="flex" key={index}>
                  <p className="font-bold w-[200px]">{item.key}</p>
                  <p className="mr-2">:</p>
                  <p>{item.value}</p>
                </div>
              )
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Profile;
