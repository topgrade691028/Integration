<h4>*DeFi Yield Farming and ethereum-boilerplate integrate*</h4>

<h4>Installation</h4>
<ul>
<li>
<h5>Install Nodejs</h5>
</li>
<li>
<p>sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install 12.18.3
node -v
</p></li>
<li><h5>Install Truffle</h5></li>
<li><p>sudo npm install -g truffle@5.1.39 --unsafe-perm=true</p></li>
<li>Ganache installation guide can be found in <a href="https://www.trufflesuite.com/ganache">here</a>.</li>
<li>MetaMask installation guide can be found in <a href="https://metamask.io/">here</a>.</li>
<li>provide your "appId" and "serverUrl" from Moralis (How to start Moralis Server) Example:<br/>
<code>REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
</code>
</li>
</ul>
<h4>How to work...</h4>
<ul>
<li>npm install</li>
<li>cd Truffle</li>
<li>truffle migrate --reset</li>
<li>truffle exec scripts/issue-tokens.js</li>
<li>In Truffle folder, Copy files of build/contracts</li>  
<li>cd ..</li>
<li>In the src/contract/abis, copy files</li>
<li>npm start</li>
</ul>
