export const design = {
  counters: {
    u_column: 6,
    u_row: 5,
    u_content_button: 1,
    u_content_image: 2,
    u_content_text: 6,
    u_content_divider: 2,
  },
  body: {
    rows: [
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: 'image',
                values: {
                  containerPadding: '9px 9px 9px NaNpx',
                  _meta: {
                    htmlID: 'u_content_image_2',
                    htmlClassNames: 'u_content_image',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  src: {
                    url: 'http://www.2hats.com.au/img/company-logo.png',
                    width: 149,
                    height: 99,
                  },
                  fullWidth: false,
                  textAlign: 'center',
                  maxWidth: '100%',
                  altText: 'Image',
                  action: { url: '', target: '' },
                },
              },
              {
                type: 'text',
                values: {
                  containerPadding: '10px 10px 10px 40px',
                  _meta: {
                    htmlID: 'u_content_text_1',
                    htmlClassNames: 'u_content_text',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  color: '#000',
                  textAlign: 'left',
                  lineHeight: '140%',
                  text:
                    '<p style="font-size: 14px; line-height: 140%;">hi {{firstName}},</p>',
                },
              },
              {
                type: 'text',
                values: {
                  containerPadding: '10px 10px 10px 40px',
                  _meta: {
                    htmlID: 'u_content_text_2',
                    htmlClassNames: 'u_content_text',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  color: '#000',
                  textAlign: 'left',
                  lineHeight: '140%',
                  text:
                    '<p style="font-size: 14px; line-height: 140%;">This is a new Text block. Change the text.</p>',
                },
              },
              {
                type: 'button',
                values: {
                  containerPadding: '10px 10px 10px 40px',
                  _meta: {
                    htmlID: 'u_content_button_1',
                    htmlClassNames: 'u_content_button',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  href: { url: 'https://portal.2hats.com.au', target: '_self' },
                  buttonColors: {
                    color: '#FFFFFF',
                    backgroundColor: '#f15a29',
                    hoverColor: '#e65324',
                  },
                  textAlign: 'left',
                  lineHeight: '120%',
                  border: {},
                  borderRadius: '4px',
                  padding: '15px',
                  text: 'ATC BUTTON',
                  calculatedWidth: 118,
                  calculatedHeight: 46,
                },
              },
              {
                type: 'text',
                values: {
                  containerPadding: '10px 10px 10px 40px',
                  _meta: {
                    htmlID: 'u_content_text_3',
                    htmlClassNames: 'u_content_text',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  color: '#000',
                  textAlign: 'left',
                  lineHeight: '140%',
                  text:
                    '<p style="font-size: 14px; line-height: 140%;">This is a new Text block. Change the text.</p>',
                },
              },
            ],
            values: {
              _meta: { htmlID: 'u_column_1', htmlClassNames: 'u_column' },
            },
          },
        ],
        values: {
          columns: false,
          columnsBackgroundColor: '#ffffff',
          backgroundColor: '#f6f6f6',
          backgroundImage: {
            url: '',
            fullWidth: true,
            repeat: false,
            center: true,
            cover: false,
          },
          padding: '25px 18px 9px',
          noStackMobile: false,
          _meta: { htmlID: 'u_row_1', htmlClassNames: 'u_row' },
          selectable: true,
          draggable: true,
          deletable: true,
        },
      },
      {
        cells: [1],
        columns: [
          {
            contents: [
              {
                type: 'text',
                values: {
                  containerPadding: '0px 10px 10px',
                  _meta: {
                    htmlID: 'u_content_text_4',
                    htmlClassNames: 'u_content_text',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  color: '#979797',
                  textAlign: 'center',
                  lineHeight: '140%',
                  text:
                    '<p style="font-size: 14px; line-height: 140%;"><span style="color: #b7b7b7; font-family: Helvetica, Arial, sans-serif; font-size: 12px; background-color: #f9f9f9; line-height: 16.8px;">66 Devonshire Street, Surry Hills, Sydney.</span></p>',
                },
              },
              {
                type: 'text',
                values: {
                  containerPadding: '0px 10px 10px',
                  _meta: {
                    htmlID: 'u_content_text_6',
                    htmlClassNames: 'u_content_text',
                  },
                  selectable: true,
                  draggable: true,
                  deletable: true,
                  color: '#e9e9e9',
                  textAlign: 'center',
                  lineHeight: '140%',
                  text:
                    '<p style="font-size: 14px; line-height: 140%;"><a href="%unsubscribe_url%"><span style="color: #999999; font-family: Helvetica, Arial, sans-serif; font-size: 12px; line-height: 16.8px;"> Unsubscribe from our emails</span></a></p>',
                },
              },
            ],
            values: {
              _meta: { htmlID: 'u_column_6', htmlClassNames: 'u_column' },
            },
          },
        ],
        values: {
          columns: false,
          columnsBackgroundColor: '',
          backgroundColor: '',
          backgroundImage: {
            url: '',
            fullWidth: true,
            repeat: false,
            center: true,
            cover: false,
          },
          padding: '10px',
          noStackMobile: false,
          _meta: { htmlID: 'u_row_5', htmlClassNames: 'u_row' },
          selectable: true,
          draggable: true,
          deletable: true,
        },
      },
    ],
    values: {
      backgroundColor: '#f6f6f6',
      backgroundImage: {
        url: '',
        fullWidth: true,
        repeat: false,
        center: true,
        cover: false,
      },
      contentWidth: '500px',
      fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
      _meta: { htmlID: 'u_body', htmlClassNames: 'u_body' },
    },
  },
};
