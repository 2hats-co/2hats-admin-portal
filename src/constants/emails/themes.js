export const THEME1 = {
    wrapper: `<div style="background-color:#f9f9f9;margin:0px;padding:20px" bgcolor="f9f9f9">
    <table cellspacing="0" border="0" cellpadding="0" align="center" bgcolor="white" style="border-collapse:separate;border-spacing:0;font-family:Helvetica,Arial,sans-serif;letter-spacing:0;table-layout:fixed width:100%; max-width:560px;">
      <tbody>
        <tr>
        <td style="border:1px solid #dddddd;border-radius:2px;font-family:Helvetica,Arial,sans-serif;font-size:16px;padding:40px 60px">
        {{logo}}
          <table width="100%" style="border-collapse:separate;border-spacing:0;table-layout:fixed">
            <tbody>
                <tr><td style="color:#525252;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:22px;padding:0">{{body}}</td></tr>
            </tbody>
            </table>
        </td>
      </tr>
    </tbody>
  </table>
  <table  width="100%" align="middle" style="border-collapse:separate;border-spacing:0;table-layout:fixed">
  <tbody>
  <tr>
    <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;padding:0">
      <table cellspacing="0" border="0" cellpadding="0" align="center" bgcolor="transparent" style="border-collapse:separate;border-spacing:0;font-family:Helvetica,Arial,sans-serif;letter-spacing:0;table-layout:fixed">
        <tbody>
            <tr>
            <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;padding:21px 30px 15px;text-align:center" align="center">{{footer}}</td>
            </tr>
     </tbody>
    </table>
    </td>
  </tr>
  </tbody>
  </table>
  </div></div>
  `,
    logo: `<table width="100%" style="border-collapse:separate;border-spacing:0;table-layout:fixed">
    <tbody>
  <tr>
      <td style="font-family:Helvetica,Arial,sans-serif;font-size:16px;padding:0;text-align:left" align="left">
          <img src="{{url}}" width="165" height="59" style="padding:15px 0 30px;text-align:left">
      </td>
    </tr>
  </tbody>
  </table>`,
    button: `<table style="border-collapse:collapse;border-spacing:0;margin:17px 0;table-layout:fixed;text-align:left!important">
    <tbody>
        <tr>
            <td style="background-color:#f15a29;border:1px none #dadada;border-radius:3px;font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;padding:12px 35px;text-align:left;vertical-align:top" align="left" bgcolor="#F15A29" valign="top">
                <a href="{{url}}" target="_blank" style="background-color:#f15a29;border:none;border-radius:3px;color:white;display:inline-block;font-size:14px;font-weight:bold;outline:none!important;text-decoration:none">{{label}}</a>
            </td>
        </tr>
    </tbody>
    </table>`,
    header: `<h1 style="color:#282f33;font-size:26px;font-weight:normal;line-height:33px;margin-bottom:7px;margin-top:0;text-align:left!important" align="left">{{text}}</h1>`,
    paragraph: `<p style="line-height:1.5;margin:0 0 17px;text-align:left!important" align="left">{{content}}</p>`,
    signture: `<p  style="line-height:1.5;margin:0 0 17px;text-align:left!important" align="left">{{greeting}},<br><br>{{title}}, <br>{{name}},<br>{{company}}</p>`,
    footerText: `<p style="color:#b7b7b7;font-size:12px;font-weight:300;margin:0 0 6px;text-decoration:none">{{text}}</p>`,
    footerLink: ` <p style="color:#b7b7b7;font-size:12px;font-weight:300;margin:0;text-decoration:none"><a href="{{url}}" style="border:none;color:#b7b7b7;display:block;font-size:12px;font-weight:300;margin:12px 0 0;outline:none!important;text-decoration:underline" target="_blank">{{label}}</a></p>`
}