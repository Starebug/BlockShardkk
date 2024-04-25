import { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import {Web3} from 'web3';
import Display from "./Display";
import Sidebar from "./sidebar";
import {Link} from 'react-router-dom';
import {Route, Routes} from 'react-router'
import Modal from "./Modal";
const Redirect = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new Web3(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          setAccount(accounts[0]);
        })
        .catch((error) => {
          alert("null");
        });
        let contractAddress = "0xF58EfDc30F6e8c12f94fa1d41D3ED423AfeE4951";
        const abi = require('../artifacts/contracts/New.sol/New.json').abi;
        const contract = new provider.eth.Contract(abi, contractAddress);
        setContract(contract);
        setProvider(provider);
      } else {
        alert("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
 <div className="flex items-start">
    <div className=" min-h-[100vh] w-[17%] bg-black fixed left-0 top-0 pt-8">
        <Sidebar/>
        </div>
    <div className="ml-[17%]">
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

      <div className="new">
      <h1 style={{ color: "#38598b", marginTop:20,fontFamily:"sans-serif",fontSize:"50px" }}>BlockShard</h1>
      <h2 className="storage-heading" style={{ color: "#265073", marginTop: 20, fontFamily: "sans-serif", fontSize: 45, textAlign: "center" }}>Simplifing File Storage on Blockchain</h2>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: "black", fontFamily:"sans-serif", marginTop:35, fontSize:20}}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}   
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}/>
      </div>
    </div>
</div>
  );
}

export default Redirect;
