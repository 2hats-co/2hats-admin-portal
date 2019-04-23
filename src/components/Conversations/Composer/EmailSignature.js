import React, { useContext } from 'react';
import CurrentUserContext from '../../../contexts/CurrentUserContext';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const signatureGenerator = (
  firstName,
  title,
  email
) => `<table border="0" cellspacing="0" cellpadding="0" style="font-size:12.8px;width:360pt">
<tbody>
<tr>
<td width="113" style="width:3cm;border-top:none;border-bottom:none;border-left:none;border-right:1.5pt solid darkgray;padding:0cm 7.5pt 0cm 0cm">
<img src="https://ci3.googleusercontent.com/proxy/6SWiZZHMWzyi70-DTrs7ErA8lh2H7DCogpYvIywqaY4L-iix_btJpjqjXiZLh-45pCcUQUrMiqvt3itgxsmxnZ28QZjUK2J-tIob2ig8nxVXmOC706oGpdGAnhllLKEdYE4nBKcripoXNUSr_XCU-iEi=s0-d-e1-ft#https://drive.google.com/a/2hats.com.au/uc?id=1juBPK7lWMonnXXrvV27hM9Lt27eCFsfg&amp;export=download" class="CToWUd"><br>
</td>
<td width="387" style="width:289.95pt;padding:0cm 0cm 0cm 7.5pt">
<table border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="padding:0cm">
<p></p>
</td>
</tr>
<tr>
<td style="padding:3.75pt 0cm 0cm"><font face="Arial, sans-serif"><span style="color:rgb(59,56,56);font-weight:bold;font-size:17.3333px">${firstName}</span><br>
<span style="font-weight:bold"><font color="#999999" size="2">${title}&nbsp;</font></span><font size="2" style="color:rgb(59,56,56)"><br>
e:&nbsp;<a href="mailto:${email}" style="color:rgb(17,85,204)" target="_blank"><span>${email}</span></a>&nbsp;| w:&nbsp;<a href="http://www.2hats.com.au/" style="color:rgb(17,85,204)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://www.2hats.com.au/&amp;source=gmail&amp;ust=1553833672194000&amp;usg=AFQjCNGO6PxKnkaR9L32zX-xsC7FF-uXHA">www.2hats.com.au</a><br>
</font><br>
</font><a href="https://www.linkedin.com/company/2hats/" style="color:rgb(17,85,204)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/2hats/&amp;source=gmail&amp;ust=1553833672194000&amp;usg=AFQjCNEuG_zFJWu6aTr1MprQ2n4Lw8SD9w"><img alt=" 2hats LinkedIn" src="https://ci3.googleusercontent.com/proxy/WnFSCi9Gq3IMIy_yM0djAvkdqf0Xw-Ncox-bk3Re0crnrVbhYDSpou6gMXAnsJEet4e7Ij2wMjq9apF0bASGsMqWJKRrw8I6_D7e-jxg9FPvnarv-7SaA18vZhxO399Zxl3fiMHKTAhsAvp2-AoqkYFjRmlXdOWyaslwgHGC45I9EbKA_2Twt5Vy07cqHB6dwgWaGONDKNe1RNRJrQ=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1Lu9DaaANKoFXm2X8HWvoEZWuIpDcLjy1&amp;revid=0B4ybGrYM_lEmdzZFWnp4RVdtY3FzTFFWZ25kbHNuUlhEaTRzPQ" class="CToWUd"></a>&nbsp;&nbsp;<a href="https://www.facebook.com/2hats.com.au" style="color:rgb(17,85,204)" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/2hats.com.au&amp;source=gmail&amp;ust=1553833672194000&amp;usg=AFQjCNE5u36_6Xfx0fd1rkhDdE9q_VrA6A"><img alt=" 2hats Facebook" src="https://ci5.googleusercontent.com/proxy/cScBmpWACON_ObnNYBlXzSvGEVdFHgvH0ThkoKK2o-2m_RVpFRAjcFoCC84HCZFFFjBfGIAQGRZKjw9ERkPNDB_SYp8FUK6feIYS7Wr5NOcS9_xAeOlYHZ4vIA83cfkBaFaDaGQOC56sHu1cHhMFpYgTAEfpJshNrpoVo2SI2eP2dC454vN2ZWlMH3LEsllZm5Kv13Ojx7Uaq7RfEw=s0-d-e1-ft#https://docs.google.com/uc?export=download&amp;id=1wEBTcKcBJfsT4KsPw-dwt2u_jOcjur7z&amp;revid=0B4ybGrYM_lEmRHdVMkwxaFo1ak9KVWFsTWJLV0d3UEl3akg4PQ" class="CToWUd"></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td colspan="2" style="padding:3.75pt 0cm 0cm">
<p style="text-align:justify"><span style="font-size:8pt;font-family:Arial,sans-serif;color:rgb(136,136,136)">2hats accepts no liability for the content of this email, or for the consequences of any actions taken on the basis of the information provided, unless
 that information is subsequently confirmed in writing. If you are not the intended recipient you are notified that disclosing, copying, distributing or taking any action in reliance on the contents of this information is strictly prohibited.</span></p>
</td>
</tr>
</tbody>
</table>`;
const EmailSignature = props => {
  const currentUser = useContext(CurrentUserContext);
  const { setSignature } = props;
  if (!currentUser) return <div />;
  const emailSignature = signatureGenerator(
    currentUser.givenName,
    currentUser.title,
    currentUser.email
  );

  const handleChange = (e, v) => {
    if (v) setSignature(emailSignature);
    else setSignature('');
  };
  return (
    <FormControlLabel
      control={<Switch onChange={handleChange} value="email" />}
      label="Email Signature"
    />
  );
};

export default EmailSignature;
