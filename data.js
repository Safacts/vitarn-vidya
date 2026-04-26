// RPA Course Data - Vitarn Vidya
const RPA_DATA = {
    units: [
        {
            id: 1,
            title: "Robotic Process Automation & UIPath Basics",
            topics: [
                "RPA Introduction & Components",
                "UiPath Stack (Studio, Robot, Orchestrator)",
                "Types of Robots (Attended vs Unattended)",
                "Task Recorder & Input/Output Methods"
            ],
            content: `# UNIT 1: Robotic Process Automation & UIPath Basics

## 1. Robotic Process Automation: Introduction

### What is RPA?
Robotic Process Automation (RPA) is a technology that uses software robots or "bots" to automate repetitive, rule-based business processes. These bots mimic human actions by interacting with digital systems and applications through the user interface (UI).

### Key Characteristics of RPA:
- **Rule-based**: Follows predefined rules and structured data
- **Non-invasive**: Works through the UI without modifying existing systems
- **Scalable**: Can handle increased workload without additional resources
- **Accurate**: Reduces human errors significantly
- **Cost-effective**: Lower operational costs compared to manual processing
- **24/7 Operation**: Bots can work continuously without breaks

### Components of RPA:
1. **RPA Software (The Bot)**: Execution engine, UI interaction layer, logic processing
2. **Development Environment (Studio)**: Workflow designer, activity library, debugger
3. **Control Center (Orchestrator)**: Bot management, process deployment, monitoring
4. **Bot Agents**: Attended bots, unattended bots, hybrid bots

## 2. UiPath Stack

### UiPath Studio
Development environment for creating automation workflows with visual designer, activity panels, and debugging tools.

### UiPath Robot
Execution engine that runs automation workflows. Types:
- **Attended Robot**: Runs on user's machine, user-triggered
- **Unattended Robot**: Runs autonomously on dedicated machines
- **Development Robot**: For testing during development

### UiPath Orchestrator
Central management platform for controlling and monitoring robots with features like robot management, process deployment, job scheduling, and monitoring.

## 3. Input Methods

### Simulate Type (Recommended)
- Fastest input method
- Works in background
- Doesn't require UI focus

### Send Window Messages
- Faster than hardware events
- Works with focused window
- Triggers application events

### Hardware Events
- Simulates actual keyboard input
- Slowest but most reliable
- Works with all applications

## 4. Output Methods

### Get Full Text
Retrieves all visible text, fast and efficient

### Get Visible Text
Gets only currently visible text, faster for large documents

### Get OCR Text
Uses OCR technology, works with images and PDFs

### Native
Uses application's native methods, most accurate when available`,
            quiz: [
                {
                    question: "What is RPA?",
                    options: [
                        "A programming language for robots",
                        "Technology that uses software robots to automate repetitive tasks",
                        "A hardware robot for manufacturing",
                        "A database management system"
                    ],
                    correct: 1,
                    explanation: "RPA (Robotic Process Automation) uses software robots to automate repetitive, rule-based business processes by mimicking human actions through UI."
                },
                {
                    question: "Which input method is the fastest in UiPath?",
                    options: [
                        "Hardware Events",
                        "Send Window Messages",
                        "Simulate Type",
                        "Native"
                    ],
                    correct: 2,
                    explanation: "Simulate Type is the fastest input method as it works in the background and doesn't require UI focus."
                },
                {
                    question: "What is the difference between Attended and Unattended robots?",
                    options: [
                        "Attended robots are faster",
                        "Unattended robots require user interaction",
                        "Attended robots run on user's machine and are user-triggered, Unattended run autonomously",
                        "There is no difference"
                    ],
                    correct: 2,
                    explanation: "Attended robots work alongside human users on their machines and are triggered by users, while Unattended robots run autonomously on dedicated servers without human intervention."
                },
                {
                    question: "What is the purpose of UiPath Orchestrator?",
                    options: [
                        "To write code",
                        "To design workflows",
                        "Central management platform for controlling and monitoring robots",
                        "To test robots"
                    ],
                    correct: 2,
                    explanation: "UiPath Orchestrator is a central management platform that enables centralized management, deployment, and monitoring of UiPath robots and automation processes."
                },
                {
                    question: "Which OCR engine is the default in UiPath?",
                    options: [
                        "Microsoft OCR",
                        "Abbyy OCR",
                        "Google OCR",
                        "Tesseract OCR"
                    ],
                    correct: 2,
                    explanation: "Google OCR is the default OCR engine in UiPath. It's free, built-in, and provides good accuracy for general text."
                },
                {
                    question: "What is a selector in UiPath?",
                    options: [
                        "A programming language",
                        "XML-like strings identifying UI elements",
                        "A type of robot",
                        "A database query"
                    ],
                    correct: 1,
                    explanation: "Selectors are XML-like strings that identify UI elements. They have a hierarchical structure and are critical for stable automation."
                },
                {
                    question: "Which recording type is recommended for web automation?",
                    options: [
                        "Basic Recording",
                        "Desktop Recording",
                        "Web Recording",
                        "Native Recording"
                    ],
                    correct: 2,
                    explanation: "Web Recording is optimized for web browsers, handles dynamic web elements better, and is recommended for web automation."
                },
                {
                    question: "What does UIPath Studio provide?",
                    options: [
                        "Only robot execution",
                        "Development environment for creating automation workflows",
                        "Only monitoring capabilities",
                        "Only cloud storage"
                    ],
                    correct: 1,
                    explanation: "UiPath Studio is the development environment that provides a visual designer, activity panels, debugging tools, and a recorder for creating automation workflows."
                },
                {
                    question: "Which output method works with images and PDFs?",
                    options: [
                        "Get Full Text",
                        "Get Visible Text",
                        "Get OCR Text",
                        "Native"
                    ],
                    correct: 2,
                    explanation: "Get OCR Text uses OCR technology to extract text from images and PDFs, making it useful when normal text extraction methods fail."
                },
                {
                    question: "What is the main benefit of RPA being non-invasive?",
                    options: [
                        "It's cheaper",
                        "It works through UI without modifying existing systems",
                        "It's faster",
                        "It requires no coding"
                    ],
                    correct: 1,
                    explanation: "RPA being non-invasive means it works through the user interface without requiring modifications to existing systems, making implementation faster and less risky."
                }
            ]
        },
        {
            id: 2,
            title: "Sequence, Flowchart, Control Flow & Data Manipulation",
            topics: [
                "Control Flow Activities",
                "Variables & Scope",
                "Collections (List, Dictionary, Array)",
                "Arguments (In, Out, In/Out)",
                "Data Table Operations",
                "File Operations & CSV/Excel handling"
            ],
            content: `# UNIT 2: Sequence, Flowchart, Control Flow & Data Manipulation

## 1. Control Flow Activities

### If Activity
Executes different branches based on a condition with True and False branches.

### For Each Activity
Iterates through each item in a collection (lists, arrays, data tables).

### While Activity
Repeats activities while condition is true (pre-condition loop).

### Do While Activity
Repeats activities until condition becomes false (post-condition loop, executes at least once).

### Switch Activity
Multiple condition branching with different case values and a default case.

## 2. Variables & Scope

### Variable Scope Hierarchy:
1. **Global**: Accessible throughout entire project
2. **Workflow**: Accessible within the workflow (default)
3. **Container**: Accessible within container (If, For Each, etc.)
4. **Local**: Narrowest scope

### Data Types:
- **String**: Text data
- **Int32/Int64**: Whole numbers
- **Double**: Decimal numbers
- **Boolean**: True/False values
- **DateTime**: Date and time values

## 3. Collections

### Array
Fixed-size collection, same type elements, zero-based indexing.

### List (System.Collections.Generic.List)
Dynamic size, same type elements, rich methods (Add, Remove, Contains).

### Dictionary
Key-value pairs, unique keys, fast lookup by key.

### Queue
First-In-First-Out (FIFO), Enqueue (add to back), Dequeue (remove from front).

### Stack
Last-In-First-Out (LIFO), Push (add to top), Pop (remove from top).

## 4. Arguments

### In
Data enters the workflow, read-only within the workflow.

### Out
Data exits the workflow, must be assigned before workflow ends.

### In/Out
Data enters and can be modified, modified value returned to caller.

## 5. Data Table Operations

### Creating Data Tables
- Build Data Table activity
- Programmatic creation with columns and rows

### Common Operations
- Filter Data Table: Filter rows based on condition
- Sort Data Table: Sort rows by column(s)
- Add Data Row: Add single row
- Output Data Table: Write to file

## 6. File Operations

### Common File Operations
- Read Text File: Reads entire file content
- Write Text File: Writes content to file
- Append Line: Adds line to end of file
- Copy File: Copies to new location
- Move File: Moves to new location
- Delete File: Removes file

### CSV/Excel to Data Table
- Read CSV: Using Read CSV activity
- Read Excel: Using Excel Application Scope with Read Range
- Convert: Generate Data Table activity`,
            quiz: [
                {
                    question: "What is the difference between Sequence and Flowchart?",
                    options: [
                        "Sequence is for complex logic, Flowchart is for simple tasks",
                        "Sequence executes linearly, Flowchart supports branching and complex decision logic",
                        "Flowchart is faster than Sequence",
                        "There is no difference"
                    ],
                    correct: 1,
                    explanation: "Sequence executes activities one after another in a linear manner, while Flowchart supports complex branching and decision logic with visual representation."
                },
                {
                    question: "Which loop always executes at least once?",
                    options: [
                        "While loop",
                        "For Each loop",
                        "Do While loop",
                        "For loop"
                    ],
                    correct: 2,
                    explanation: "Do While loop is a post-condition loop that checks the condition after executing the activities, so it always executes at least once."
                },
                {
                    question: "What is the difference between Array and List?",
                    options: [
                        "Array is dynamic, List is fixed-size",
                        "Array is fixed-size, List is dynamic",
                        "They are the same",
                        "List is faster than Array"
                    ],
                    correct: 1,
                    explanation: "Array has a fixed size that cannot be changed after creation, while List is dynamic and can grow or shrink as needed."
                },
                {
                    question: "What does an 'In' argument do?",
                    options: [
                        "Returns data from the workflow",
                        "Passes data into the workflow, read-only",
                        "Modifies data and returns it",
                        "Stores credentials"
                    ],
                    correct: 1,
                    explanation: "An 'In' argument passes data into a workflow and is read-only within that workflow. It cannot be modified inside the workflow."
                },
                {
                    question: "What is a DataTable?",
                    options: [
                        "A database",
                        "An in-memory representation of a table with rows and columns",
                        "A file format",
                        "A type of robot"
                    ],
                    correct: 1,
                    explanation: "A DataTable is an in-memory representation of a table with rows and columns, similar to an Excel spreadsheet, used for handling structured data."
                },
                {
                    question: "Which collection follows First-In-First-Out (FIFO) principle?",
                    options: [
                        "Stack",
                        "Queue",
                        "Dictionary",
                        "Array"
                    ],
                    correct: 1,
                    explanation: "Queue follows the FIFO principle where the first element added is the first one to be removed (Enqueue adds to back, Dequeue removes from front)."
                },
                {
                    question: "What is variable scope?",
                    options: [
                        "The size of a variable",
                        "The accessibility of a variable within different parts of a workflow",
                        "The data type of a variable",
                        "The value of a variable"
                    ],
                    correct: 1,
                    explanation: "Variable scope determines where a variable can be accessed - Global (entire project), Workflow (within workflow), Container (within specific block), or Local (narrowest)."
                },
                {
                    question: "How do you read a CSV file into a DataTable?",
                    options: [
                        "Use Read Text File activity",
                        "Use Read CSV activity",
                        "Use Write CSV activity",
                        "CSV files cannot be read into DataTable"
                    ],
                    correct: 1,
                    explanation: "The Read CSV activity is specifically designed to read CSV files and convert them into a DataTable format for processing."
                },
                {
                    question: "What is the purpose of the Switch activity?",
                    options: [
                        "To iterate through collections",
                        "To handle multiple condition branching based on a single variable",
                        "To handle exceptions",
                        "To read files"
                    ],
                    correct: 1,
                    explanation: "The Switch activity is used for multiple condition branching based on different values of a single variable, with a default case for unmatched values."
                },
                {
                    question: "Which activity is used to add a row to a DataTable?",
                    options: [
                        "Build Data Table",
                        "Add Data Row",
                        "Filter Data Table",
                        "Output Data Table"
                    ],
                    correct: 1,
                    explanation: "The Add Data Row activity is used to add a single row (or multiple rows) to an existing DataTable."
                }
            ]
        },
        {
            id: 3,
            title: "Taking Control of Controls & Plugins/Extensions",
            topics: [
                "Window Attachment & Control Finding",
                "Wait Techniques",
                "OCR (When to use, Types, How to use)",
                "Mouse & Keyboard Activities",
                "Plugins (Terminal, SAP, Citrix)",
                "Credential Management"
            ],
            content: `# UNIT 3: Taking Control of Controls & Plugins/Extensions

## 1. Window Attachment & Control Finding

### Window Attachment
Process of connecting UiPath to a specific application window for reliable interaction.

### Activities:
- **Attach Window**: Attaches to an already open window
- **Open Application**: Launches application and attaches to it

### Finding Controls
Using selectors to identify UI elements. Selector structure:
\`\`\`xml
<wnd app='application.exe' cls='WindowClass' title='Window Title' />
  <ctrl name='ControlName' role='push button' />
\`\`\`

### UI Explorer
Advanced tool for exploring and editing selectors with visual tree representation.

## 2. Wait Techniques

### WaitForReady
Built into most UI activities, waits for control to be ready (Interactive, Complete, None).

### Element Exists
Checks if element exists with timeout, returns Boolean.

### Retry Scope
Retries activities on failure with configurable retry count and delay.

### On Element Appear
Event-based trigger that waits for element to appear.

### Delay
Fixed time delay (not recommended for production).

## 3. OCR

### When to Use OCR:
- Virtualized controls
- Images and PDFs
- Legacy applications
- Citrix/Virtual Desktops
- When normal methods fail

### OCR Engines:
- **Google OCR**: Default, free, good accuracy
- **Microsoft OCR**: Built-in, fast, limited languages
- **Abbyy OCR**: Commercial, excellent accuracy, requires license
- **Tesseract OCR**: Open-source, good accuracy, requires installation

### How to Use OCR:
Get OCR Text activity with engine selection, language specification, and profile settings.

## 4. Mouse & Keyboard Activities

### Mouse Activities:
- **Click**: Single/double click on element
- **Hover**: Mouse over element
- **Send Mouse Click**: More control with coordinates
- **Scroll**: Scroll element or window

### Keyboard Activities:
- **Type Into**: Types text into element
- **Send Hotkey**: Sends keyboard shortcuts
- **Get Text**: Extracts text from element

## 5. Plugins

### Terminal Plugin
Automates terminal sessions (SSH, Telnet, Serial) for command-line interfaces and legacy systems.

### SAP Automation
Automates SAP ERP systems with SAP-specific activities for transactions and business processes.

### Citrix Automation
Automates virtual desktop environments using image recognition and OCR when direct UI access is not available.

## 6. Credential Management

### Storage Options:
- **Windows Credential Manager**: System-wide encrypted storage
- **Orchestrator Assets**: Cloud-based secure storage
- **Azure Key Vault**: Enterprise secret storage

### Activities:
- **Get Credential**: Retrieves stored credentials
- **Add Credential**: Stores new credentials
- **Delete Credential**: Removes stored credentials`,
            quiz: [
                {
                    question: "What is window attachment?",
                    options: [
                        "A type of robot",
                        "Process of connecting UiPath to a specific application window",
                        "A file format",
                        "A debugging tool"
                    ],
                    correct: 1,
                    explanation: "Window attachment is the process of connecting UiPath to a specific application window to establish a stable connection for reliable UI interaction."
                },
                {
                    question: "Which OCR engine is the default in UiPath?",
                    options: [
                        "Microsoft OCR",
                        "Abbyy OCR",
                        "Google OCR",
                        "Tesseract OCR"
                    ],
                    correct: 2,
                    explanation: "Google OCR is the default OCR engine in UiPath. It's free, built-in, and provides good accuracy for general text without requiring additional setup."
                },
                {
                    question: "When should you use OCR?",
                    options: [
                        "Always, as it's the best method",
                        "When normal UI automation methods fail (virtualized controls, images, PDFs, legacy apps)",
                        "Never, it's too slow",
                        "Only for web applications"
                    ],
                    correct: 1,
                    explanation: "OCR should be used when normal UI automation methods fail, such as with virtualized controls, images, PDFs, legacy applications, or Citrix environments where text is not accessible through standard methods."
                },
                {
                    question: "What is the purpose of the Terminal plugin?",
                    options: [
                        "To automate web browsers",
                        "To automate terminal sessions and command-line interfaces",
                        "To automate Excel",
                        "To automate email"
                    ],
                    correct: 1,
                    explanation: "The Terminal plugin is used to automate terminal sessions, command-line interfaces, and character-based applications using protocols like SSH, Telnet, and Serial connections."
                },
                {
                    question: "What is Citrix automation?",
                    options: [
                        "Automating Citrix company website",
                        "Automating virtual desktop environments where direct UI access is not available",
                        "A type of robot",
                        "A database"
                    ],
                    correct: 1,
                    explanation: "Citrix automation involves automating applications running in virtual desktop environments (VDI) where direct UI access is not available, typically using image recognition and OCR."
                },
                {
                    question: "Which wait technique is event-based?",
                    options: [
                        "Delay",
                        "Element Exists",
                        "On Element Appear",
                        "WaitForReady"
                    ],
                    correct: 2,
                    explanation: "On Element Appear is an event-based trigger that waits for an element to appear and executes activities when the element is detected, making it more efficient than polling."
                },
                {
                    question: "What is credential management?",
                    options: [
                        "Managing user passwords manually",
                        "Secure storage and retrieval of sensitive information like usernames and passwords",
                        "Creating new users",
                        "Deleting user accounts"
                    ],
                    correct: 1,
                    explanation: "Credential management is the secure storage and retrieval of sensitive information like usernames, passwords, API keys, and other secrets used in automation."
                },
                {
                    question: "What does UI Explorer do?",
                    options: [
                        "Explores the internet",
                        "Advanced tool for exploring and editing selectors with visual tree representation",
                        "Manages robots",
                        "Creates workflows"
                    ],
                    correct: 1,
                    explanation: "UI Explorer is an advanced tool that provides a visual representation of the UI element hierarchy, allows editing and validating selectors, and helps understand the structure of application UI."
                },
                {
                    question: "Which mouse activity provides more control with coordinates?",
                    options: [
                        "Click",
                        "Hover",
                        "Send Mouse Click",
                        "Scroll"
                    ],
                    correct: 2,
                    explanation: "Send Mouse Click provides more control over click operations by allowing specification of exact coordinates and offsets from elements."
                },
                {
                    question: "What is the Retry Scope activity used for?",
                    options: [
                        "To retry the entire workflow",
                        "To retry activities on failure with configurable retry count and delay",
                        "To retry only the first activity",
                        "To retry after 24 hours"
                    ],
                    correct: 1,
                    explanation: "Retry Scope is used to retry a set of activities when they fail, with configurable number of retries and delay between retries, making automation more robust."
                }
            ]
        },
        {
            id: 4,
            title: "User Events, Assistant Bots, Exception Handling & Debugging",
            topics: [
                "Assistant Bots",
                "System Events",
                "Exception Handling (Try-Catch, Throw, Retry Scope)",
                "Common Exceptions & Handling",
                "Debugging Techniques",
                "Logging & Screenshots",
                "Error Reporting"
            ],
            content: `# UNIT 4: User Events, Assistant Bots, Exception Handling & Debugging

## 1. Assistant Bots

### What are Assistant Bots?
Attended robots that work alongside human users to assist them with their tasks.

### Characteristics:
- Attended mode (run on user's machine)
- User-triggered execution
- Collaborative operation
- Context-aware
- Interactive

### Use Cases:
- Customer service assistance
- Data entry help
- Form filling
- Validation
- Research assistance

## 2. System Events

### Types of System Events:
- **File System Events**: File created, changed, deleted, renamed
- **Process Events**: Process started, stopped, changed
- **Keyboard Events**: Key press, key combinations
- **Mouse Events**: Click, move, scroll
- **Window Events**: Window opened, closed, focus changed

### Event Triggers:
- **Image Triggers**: Detect when specific image appears
- **Element Triggers**: Monitor UI element state changes
- **Keyboard Triggers**: Launch bots with hotkeys

## 3. Exception Handling

### Try-Catch-Finally Structure:
\`\`\`
Try
    [Code that might throw exception]
Catch (SpecificException)
    [Handle specific exception]
Catch (Exception)
    [Handle all other exceptions]
Finally
    [Cleanup code, always executes]
End Try
\`\`\`

### Exception Types:
- **System Exception**: Base class for all exceptions
- **Application Exception**: Application-specific errors
- **UI Automation Exception**: UI interaction failures
- **Business Rule Exception**: Business logic violations
- **Timeout Exception**: Operation timed out

### Common Exceptions:
- **Element Not Found**: UI element doesn't exist or selector incorrect
- **Timeout Exception**: Operation took longer than expected
- **Selector Not Found**: Selector doesn't match any element
- **Null Reference**: Accessing null object
- **File Not Found**: File doesn't exist

## 4. Debugging Techniques

### Debugging Tools:
- **Breakpoints**: Pause execution at specific point
- **Step Into**: Execute one activity, enter invoked workflows
- **Step Over**: Execute one activity, skip invoked workflows
- **Step Out**: Complete current workflow, return to caller
- **Watch Panel**: Monitor variable values
- **Locals Panel**: Shows all local variables
- **Call Stack Panel**: Shows execution path

## 5. Logging

### Logging Levels:
- **Trace**: Most detailed, development only
- **Debug**: Detailed debugging information
- **Info**: General information, normal operation
- **Warn**: Warning messages, potential issues
- **Error**: Error messages, workflow may continue
- **Fatal**: Critical errors, workflow stopped

### Log Message Activity:
Logs messages with specified level, can include exception details.

## 6. Screenshots

### Taking Screenshots:
- **Take Screenshot**: Captures screen or window
- **Automatic on Error**: Configure to capture on exceptions
- **Manual in Exception Handler**: Take screenshot when handling errors

### Use Cases:
- Debugging visual evidence
- Error documentation
- Testing verification
- Audit records

## 7. Error Reporting

### Reporting Methods:
- **Orchestrator Alerts**: Built-in alert system
- **Email Notifications**: Send error emails
- **Database Logging**: Store errors in database
- **Ticket System Integration**: Create support tickets

### Error Severity:
- **Critical**: Workflow stopped, immediate attention
- **High**: Partial failure, urgent attention
- **Medium**: Errors continued, attention needed
- **Low**: Minor issues, log for review`,
            quiz: [
                {
                    question: "What are assistant bots?",
                    options: [
                        "Unattended robots that run autonomously",
                        "Attended robots that work alongside human users to assist them",
                        "Robots that only work at night",
                        "Robots that cannot interact with users"
                    ],
                    correct: 1,
                    explanation: "Assistant bots are attended robots that work alongside human users on their machines, triggered by users, and designed to enhance human productivity rather than replace them."
                },
                {
                    question: "What is the Try-Catch-Finally structure used for?",
                    options: [
                        "To create workflows",
                        "To handle exceptions gracefully with Try (code), Catch (handle), Finally (cleanup)",
                        "To debug code",
                        "To log messages"
                    ],
                    correct: 1,
                    explanation: "Try-Catch-Finally is the primary exception handling mechanism where Try contains code that might throw exceptions, Catch handles specific exceptions, and Finally contains cleanup code that always executes."
                },
                {
                    question: "Which logging level is used for critical errors that stop the workflow?",
                    options: [
                        "Info",
                        "Debug",
                        "Fatal",
                        "Trace"
                    ],
                    correct: 2,
                    explanation: "Fatal logging level is used for critical errors that cause the workflow to stop completely and require immediate attention."
                },
                {
                    question: "What is a breakpoint?",
                    options: [
                        "A point where the workflow ends",
                        "A point where execution pauses to allow inspection of variable values",
                        "A type of exception",
                        "A logging level"
                    ],
                    correct: 1,
                    explanation: "A breakpoint is a debugging tool that pauses workflow execution at a specific point, allowing developers to inspect variable values, verify logic, and step through code."
                },
                {
                    question: "What is the difference between Step Into and Step Over?",
                    options: [
                        "They are the same",
                        "Step Into enters invoked workflows, Step Over skips them",
                        "Step Over enters invoked workflows, Step Into skips them",
                        "Step Into is faster"
                    ],
                    correct: 1,
                    explanation: "Step Into executes one activity at a time and enters invoked workflows to see their internal execution, while Step Over executes one activity at a time but skips (doesn't enter) invoked workflows."
                },
                {
                    question: "What is an Element Not Found exception?",
                    options: [
                        "When the element is hidden",
                        "When UI element doesn't exist or selector is incorrect",
                        "When the element is disabled",
                        "When the element is too large"
                    ],
                    correct: 1,
                    explanation: "Element Not Found exception occurs when a UI element doesn't exist or the selector used to identify it is incorrect, causing the automation to fail to find the target element."
                },
                {
                    question: "What are image triggers used for?",
                    options: [
                        "To trigger workflows when specific images appear on screen",
                        "To create images",
                        "To edit images",
                        "To compress images"
                    ],
                    correct: 0,
                    explanation: "Image triggers use image recognition to detect when a specific image appears on the screen and trigger automation in response, useful for non-selectable elements or status indicators."
                },
                {
                    question: "What is the purpose of taking screenshots in automation?",
                    options: [
                        "To create art",
                        "For debugging visual evidence, error documentation, testing verification",
                        "To slow down automation",
                        "Screenshots are not useful"
                    ],
                    correct: 1,
                    explanation: "Screenshots are taken for debugging visual evidence, error documentation, testing verification, audit records, and providing visual context when issues occur during automation."
                },
                {
                    question: "What is a Null Reference exception?",
                    options: [
                        "When a reference is too long",
                        "When accessing an object that is null (has no value)",
                        "When a reference is too short",
                        "When a reference is correct"
                    ],
                    correct: 1,
                    explanation: "Null Reference exception occurs when trying to access properties or methods of an object that is null (has no value assigned), which is a common error in programming."
                },
                {
                    question: "What is error reporting?",
                    options: [
                        "Creating errors intentionally",
                        "Documenting and communicating errors to appropriate stakeholders",
                        "Ignoring errors",
                        "Deleting errors"
                    ],
                    correct: 1,
                    explanation: "Error reporting is the process of documenting and communicating errors that occur during automation execution to appropriate stakeholders through various methods like alerts, emails, database logging, or ticket systems."
                }
            ]
        },
        {
            id: 5,
            title: "Code Management & Bot Deployment",
            topics: [
                "Project Organization",
                "Workflow Nesting & Reusability",
                "State Machine",
                "When to use Flowchart vs State Machine vs Sequence",
                "Config Files",
                "Publishing & Orchestrator",
                "License Management"
            ],
            content: `# UNIT 5: Code Management & Bot Deployment

## 1. Project Organization

### Best Practices:
- **Folder Structure**: Organize workflows in logical folders (Common, DataProcessing, Reporting)
- **Naming Conventions**: PascalCase for files, camelCase for variables
- **Modularity**: Break complex processes into smaller workflows
- **Documentation**: Document project purpose and each workflow

### Project Structure:
\`\`\`
ProjectName/
├── Main.xaml
├── project.json
├── Workflows/
│   ├── Common/
│   ├── DataProcessing/
│   └── Reporting/
├── Assets/
└── Tests/
\`\`\`

## 2. Workflow Nesting & Reusability

### Workflow Nesting
Invoking one workflow from within another using Invoke Workflow File activity.

### Benefits:
- Modularity
- Reusability
- Maintainability
- Testing
- Collaboration

### Reusability Principles:
- Generic design (avoid hardcoding)
- Clear interface (input/output)
- Error handling
- Independence (minimize dependencies)

## 3. State Machine

### Components:
- **States**: Represent different conditions or modes
- **Transitions**: Define movement between states
- **Triggers**: Events that cause transitions
- **Actions**: Activities executed when entering/leaving states

### When to Use State Machine:
- Complex approval workflows
- Multi-stage processes
- Systems with distinct states
- Processes that can pause and resume

## 4. Workflow Type Comparison

### Sequence
- **Best For**: Simple, linear processes
- **Structure**: Top-down execution
- **Use Case**: Data entry, file operations

### Flowchart
- **Best For**: Complex decision logic
- **Structure**: Branching paths
- **Use Case**: Complex validation, error handling

### State Machine
- **Best For**: State-based processes
- **Structure**: States and transitions
- **Use Case**: Order processing, approval workflows

## 5. Config Files

### Types:
- **JSON**: Human-readable, widely used
- **XML**: Structured, schema validation
- **Excel**: Familiar to users
- **Orchestrator Assets**: Cloud-based, secure

### Benefits:
- Flexibility (change without code changes)
- Environment management
- Security (separate sensitive data)
- Centralized configuration

## 6. Publishing

### Publishing Process:
1. Build the project
2. Create package (.nupkg)
3. Version management
4. Deploy to Orchestrator

### Publish Methods:
- Publish from Studio
- Command line publishing
- CI/CD pipeline

## 7. Orchestrator

### Key Features:
- **Robot Management**: Register and manage robots
- **Process Deployment**: Publish and distribute processes
- **Job Scheduling**: Schedule process execution
- **Monitoring**: Real-time monitoring and reporting

### Components:
- **Tenants**: Logical isolation
- **Folders**: Organizational structure
- **Environments**: Group robots and processes
- **Machines**: Physical or virtual hosts

## 8. License Management

### License Types:
- **Named User License**: Assigned to specific user (attended automation)
- **Robot License**: Assigned to specific robot (unattended automation)
- **Developer License**: For development and testing
- **Trial License**: Temporary evaluation

### License Allocation:
- Monitor usage regularly
- Allocate efficiently
- Reclaim unused licenses
- Plan for growth

## 9. Deployment Strategies

### Unattended Bot Deployment:
- Deploy to dedicated machines
- Schedule execution
- Queue-based processing

### Attended Bot Deployment:
- Deploy to user machines
- User-triggered execution
- Interactive operation

### Multi-Environment Deployment:
- Development environment
- Testing environment
- Production environment

## 10. Update Management

### Version Management:
- Semantic versioning (Major.Minor.Patch)
- Document changes
- Maintain backward compatibility

### Deployment Strategies:
- Automated updates
- Manual updates
- Blue-Green deployment
- Canary deployment`,
            quiz: [
                {
                    question: "What is project organization?",
                    options: [
                        "Creating random files",
                        "Structure and arrangement of automation projects for maintainability and collaboration",
                        "Deleting files",
                        "Only for large projects"
                    ],
                    correct: 1,
                    explanation: "Project organization refers to the structure and arrangement of automation projects including file organization, workflow design, and resource management to ensure maintainability, scalability, and collaboration."
                },
                {
                    question: "What is workflow nesting?",
                    options: [
                        "Putting workflows in folders",
                        "Invoking one workflow from within another to create hierarchy",
                        "Deleting workflows",
                        "Creating duplicate workflows"
                    ],
                    correct: 1,
                    explanation: "Workflow nesting is the practice of invoking one workflow from within another workflow using the Invoke Workflow File activity, creating a hierarchy of workflows that work together."
                },
                {
                    question: "What is a State Machine?",
                    options: [
                        "A physical machine",
                        "A workflow type that models a system as a set of states, transitions, and actions",
                        "A type of robot",
                        "A database"
                    ],
                    correct: 1,
                    explanation: "A State Machine is a workflow type that models a system as a set of states, transitions between states, and actions performed in each state, ideal for complex processes with multiple possible paths."
                },
                {
                    question: "When should you use a Sequence?",
                    options: [
                        "For complex decision logic",
                        "For simple, linear processes with step-by-step execution",
                        "For state-based processes",
                        "For multi-stage processes"
                    ],
                    correct: 1,
                    explanation: "Sequence should be used for simple, linear processes where activities execute one after another in a top-down manner without branching or complex decision logic."
                },
                {
                    question: "What are config files used for?",
                    options: [
                        "Only for storing images",
                        "Storing settings and parameters externally to allow changes without modifying code",
                        "Only for storing passwords",
                        "Config files are not useful"
                    ],
                    correct: 1,
                    explanation: "Config files are external files that store settings, parameters, and configuration data, allowing changes to be made without modifying the code and enabling different configurations for different environments."
                },
                {
                    question: "What is publishing in UiPath?",
                    options: [
                        "Writing blog posts",
                        "Packaging an automation project into a deployable format (.nupkg)",
                        "Creating new robots",
                        "Deleting projects"
                    ],
                    correct: 1,
                    explanation: "Publishing is the process of packaging an automation project into a deployable format (usually a .nupkg file) that can be distributed to robots and executed."
                },
                {
                    question: "What is the purpose of Orchestrator?",
                    options: [
                        "To write code",
                        "Central management platform for controlling and monitoring robots and automation processes",
                        "To design workflows only",
                        "To test robots only"
                    ],
                    correct: 1,
                    explanation: "Orchestrator is a web-based platform that enables centralized management, deployment, and monitoring of UiPath robots and automation processes with features like robot management, process deployment, job scheduling, and monitoring."
                },
                {
                    question: "What is a Named User license?",
                    options: [
                        "License for a specific robot",
                        "License assigned to a specific user for attended automation",
                        "Free license for everyone",
                        "License only for developers"
                    ],
                    correct: 1,
                    explanation: "A Named User license is assigned to a specific user and is used for attended automation where the robot runs on the user's machine and is triggered by the user."
                },
                {
                    question: "What is semantic versioning?",
                    options: [
                        "Random version numbers",
                        "Version format (Major.Minor.Patch) indicating significance of changes",
                        "Only using numbers",
                        "Not important"
                    ],
                    correct: 1,
                    explanation: "Semantic versioning uses the format Major.Minor.Patch where Major indicates breaking changes, Minor indicates new features, and Patch indicates bug fixes, helping communicate the significance of changes."
                },
                {
                    question: "What is the difference between Flowchart and State Machine?",
                    options: [
                        "They are identical",
                        "Flowchart is for complex decision logic, State Machine is for state-based processes",
                        "State Machine is for decisions, Flowchart is for states",
                        "Neither is useful"
                    ],
                    correct: 1,
                    explanation: "Flowchart is best for complex decision logic with multiple branching paths, while State Machine is best for processes with distinct states or modes that the system can transition between."
                }
            ]
        }
    ],
    examGuide: `# RPA EXAM GUIDE

## Exam Pattern
- **Total Marks**: 70
- **Time**: 3 Hours
- **Units**: 5 Units
- **Questions**: Typically 8 questions (2 from each unit)
- **Answer**: Answer 5 questions (at least one from each unit)

## Question Types
1. **Short Answer Questions** (2-5 marks): Definitions, comparisons, brief explanations
2. **Long Answer Questions** (10 marks): Detailed explanations with examples, diagrams
3. **Practical/Problem Solving**: Workflow design, scenario-based questions

## Unit-wise Weightage
Each unit carries approximately 20% weightage in the exam.

## Key Topics to Focus

### Unit 1:
- RPA definition and characteristics
- UiPath Stack components
- Attended vs Unattended robots
- Input/Output methods
- Selectors and recording types

### Unit 2:
- Control flow activities (If, For Each, While, Switch)
- Variable scope
- Collections (List, Dictionary, Array)
- Arguments (In, Out, In/Out)
- DataTable operations
- File operations

### Unit 3:
- Window attachment
- Wait techniques
- OCR engines and when to use
- Terminal, SAP, Citrix plugins
- Credential management

### Unit 4:
- Assistant bots
- Exception handling (Try-Catch)
- Common exceptions
- Debugging techniques
- Logging levels
- Error reporting

### Unit 5:
- Project organization
- Workflow nesting and reusability
- State Machine
- Sequence vs Flowchart vs State Machine
- Config files
- Publishing and Orchestrator
- License management

## Exam Day Tips
1. Read all questions carefully
2. Choose questions you know best
3. Start with your strongest question
4. Allocate time based on marks
5. Include examples in long answers
6. Draw diagrams where helpful
7. Manage time effectively (36 minutes per question)

## Important Comparisons to Remember
- Attended vs Unattended robots
- Input methods (Simulate, Window Messages, Hardware)
- Collections (Array, List, Dictionary, Queue, Stack)
- Workflow types (Sequence, Flowchart, State Machine)
- OCR engines (Google, Microsoft, Abbyy, Tesseract)
- License types (Named User, Robot, Developer)`
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RPA_DATA;
}
