"use client"
import { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoLink,
    Autosave,
    BalloonToolbar,
    BlockQuote,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    FindAndReplace,
    Heading,
    Highlight,
    HorizontalLine,
    HtmlEmbed,
    Indent,
    IndentBlock,
    Italic,
    Link,
    Mention,
    Paragraph,
    PasteFromOffice,
    SelectAll,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Strikethrough,
    Table,
    TableCellProperties,
    TableProperties,
    TableToolbar,
    TextPartLanguage,
    TextTransformation,
    Title,
    Underline,
    Undo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/tr.js';

import 'ckeditor5/ckeditor5.css';


export default function TextEditor() {
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);

        return () => setIsLayoutReady(false);
    }, []);

    const editorConfig = {
        toolbar: {
            items: [
                'undo',
                'redo',
                '|',
                'heading',
                '|',
                'bold',
                'italic',
                'underline',
                '|',
                'link',
                'insertTable',
                'highlight',
                'blockQuote',
                'codeBlock',
                '|',
                'indent',
                'outdent'
            ],
            shouldNotGroupWhenFull: false
        },
        plugins: [
            AccessibilityHelp,
            Autoformat,
            AutoLink,
            Autosave,
            BalloonToolbar,
            BlockQuote,
            Bold,
            Code,
            CodeBlock,
            Essentials,
            FindAndReplace,
            Heading,
            Highlight,
            HorizontalLine,
            HtmlEmbed,
            Indent,
            IndentBlock,
            Italic,
            Link,
            Mention,
            Paragraph,
            PasteFromOffice,
            SelectAll,
            SpecialCharacters,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersEssentials,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,
            Strikethrough,
            Table,
            TableCellProperties,
            TableProperties,
            TableToolbar,
            TextPartLanguage,
            TextTransformation,
            Title,
            Underline,
            Undo
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link'],
        heading: {
            options: [
                {
                    model: 'paragraph',
                    title: 'Paragraph',
                    class: 'ck-heading_paragraph'
                },
                {
                    model: 'heading1',
                    view: 'h1',
                    title: 'Heading 1',
                    class: 'ck-heading_heading1'
                },
                {
                    model: 'heading2',
                    view: 'h2',
                    title: 'Heading 2',
                    class: 'ck-heading_heading2'
                },
                {
                    model: 'heading3',
                    view: 'h3',
                    title: 'Heading 3',
                    class: 'ck-heading_heading3'
                },
                {
                    model: 'heading4',
                    view: 'h4',
                    title: 'Heading 4',
                    class: 'ck-heading_heading4'
                },
                {
                    model: 'heading5',
                    view: 'h5',
                    title: 'Heading 5',
                    class: 'ck-heading_heading5'
                },
                {
                    model: 'heading6',
                    view: 'h6',
                    title: 'Heading 6',
                    class: 'ck-heading_heading6'
                }
            ]
        },
        initialData:
            '',
        language: 'tr',
        link: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            decorators: {
                toggleDownloadable: {
                    mode: 'manual',
                    label: 'Downloadable',
                    attributes: {
                        download: 'file'
                    }
                }
            }
        },
        mention: {
            feeds: [
                {
                    marker: '@',
                    feed: [
                        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
                    ]
                }
            ]
        },
        menuBar: {
            isVisible: true
        },
        placeholder: 'Gönderi içeriğini buraya yazın...',
        table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: [translations]
    };

    return (
        <div>
            <div className="main-container">
                <div className="editor-container editor-container_classic-editor">
                    <div className="editor-container__editor">
                        <div>
                            {isLayoutReady &&
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={editorConfig}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}