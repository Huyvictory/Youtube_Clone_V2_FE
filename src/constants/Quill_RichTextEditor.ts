export const toolbarQuill = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
      [{ align: [] }],
    ],
  },
  clipboard: {
    matchVisual: false,
  },
};

export const toolbarFormatQuill = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
];
