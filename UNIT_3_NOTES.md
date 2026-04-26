# UNIT 3: Taking Control of Controls & Plugins/Extensions - Detailed Notes

---

## 1. Taking Control of the Controls

### Finding and Attaching Windows

#### What is Window Attachment?
Window attachment is the process of connecting UiPath to a specific application window to interact with its UI elements. This is essential for reliable automation as it establishes a stable connection to the target application.

#### Why Attach Windows?
- **Stability**: Ensures reliable interaction with the application
- **Performance**: Reduces overhead of repeatedly finding windows
- **Scope**: Limits activities to specific window context
- **Isolation**: Prevents interference with other windows
- **Focus**: Maintains window focus during automation

#### Window Attachment Activities:

**1. Attach Window**:
- Attaches to an already open window
- Uses selector to identify window
- Activities inside work within attached window
- Window must be open before attachment

**Example**:
```
Attach Window: selector="wnd app='notepad.exe' cls='Notepad'"
    Type Into: "Hello World"
    Click: "Save button"
```

**2. Open Application**:
- Launches application and attaches to it
- Combines opening and attaching
- Waits for application to be ready
- First activity for most automations

**Example**:
```
Open Application: "C:\Program Files\Notepad\notepad.exe"
    Selector: "wnd app='notepad.exe' cls='Notepad'"
    Type Into: "Hello World"
```

**3. Window Scope**:
- Container activity for window operations
- Similar to Attach Window
- Can be used as alternative
- Provides same functionality

#### Selector Strategies for Windows:

**Window Selector Attributes**:
- **app**: Application executable name
- **cls**: Window class name
- **title**: Window title text
- **idx**: Window index (if multiple windows)
- **pid**: Process ID

**Example Selectors**:
```
' Notepad
<wnd app='notepad.exe' cls='Notepad' title='Untitled - Notepad' />

' Chrome
<wnd app='chrome.exe' cls='Chrome_WidgetWin_1' title='*Google*' />

' Excel
<wnd app='excel.exe' cls='XLMAIN' title='Book1 - Excel' />
```

#### Best Practices for Window Attachment:
- Use specific selectors (title, app, cls)
- Wait for window to be ready before attaching
- Handle multiple windows with unique selectors
- Use wildcards for dynamic titles
- Close windows after automation completes
- Use timeout settings for reliability

### Finding the Control

#### What are Controls?
Controls are individual UI elements within an application window, such as buttons, text fields, checkboxes, dropdowns, etc. Finding the correct control is crucial for successful automation.

#### Control Identification Methods:

**1. Selectors**:
- XML-like strings identifying controls
- Hierarchical structure from window to control
- Most common identification method
- Can be fine-tuned for stability

**Selector Structure**:
```
<wnd app='application.exe' cls='WindowClass' title='Window Title' />
  <ctrl name='ControlName' role='push button' />
  <ctrl idx='1' />
```

**2. UI Automation Tree**:
- Visual representation of UI hierarchy
- Shows parent-child relationships
- Available in UI Explorer
- Helps understand structure

**3. Visual Basic (VB)**:
- Uses native application APIs
- Works with some applications
- Less common in UiPath
- Application-specific

#### UI Explorer Tool:

**Purpose**: Advanced tool for exploring and editing selectors

**Features**:
- **Visual Tree**: Shows UI element hierarchy
- **Selector Editor**: Edit and validate selectors
- **Highlight**: Highlights matching elements
- **Wildcards**: Test wildcard patterns
- **Variables**: Use variables in selectors

**Using UI Explorer**:
1. Open UI Explorer from Design ribbon
2. Click "Indicate on Screen"
3. Click on target UI element
4. View generated selector
5. Edit selector as needed
6. Validate selector
7. Copy to clipboard

#### Control Selection Strategies:

**1. Stable Attributes**:
- **name**: Most stable attribute
- **id**: Unique identifier
- **automationid**: Automation-specific ID
- **tag**: HTML tag for web elements

**2. Avoid Dynamic Attributes**:
- Random numbers/strings
- Timestamps
- Session IDs
- Temporary values

**3. Hierarchy**:
- Use minimal necessary hierarchy
- Too specific = fragile
- Too general = unreliable
- Balance is key

**Example - Good vs Bad Selector**:
```
' Bad (too specific, includes dynamic ID)
<wnd app='app.exe' />
  <ctrl idx='1' />
    <ctrl id='btn_12345' />

' Good (uses stable name)
<wnd app='app.exe' />
  <ctrl name='SubmitButton' role='push button' />
```

#### Control Finding Activities:

**1. Find Element**:
- Finds single UI element
- Returns UIElement object
- Can be used with WaitForReady
- Useful for dynamic elements

**2. Find Children**:
- Finds all children of element
- Returns collection of UIElement
- Useful for processing multiple elements
- Can filter by type

**3. Element Exists**:
- Checks if element exists
- Returns Boolean
- Timeout configurable
- Used for validation

**4. Element Scope**:
- Container for element operations
- Similar to Attach Window
- Limits scope to specific element
- Improves performance

### Techniques for Waiting for a Control

#### Why Wait for Controls?
Applications may have loading times, animations, or dynamic content. Waiting ensures the control is ready before interaction, preventing failures.

#### Wait Types:

**1. WaitForReady**:
- Waits for control to be ready
- Built into most UI activities
- Configurable timeout
- Default: 30 seconds

**Usage**:
```
Click: selector="..." WaitForReady="Complete" Timeout="30"
```

**WaitForReady Options**:
- **None**: No wait
- **Interactive**: Control can receive input
- **Complete**: Control fully loaded
- **Interactive**: Faster than Complete

**2. Delay Activity**:
- Fixed time delay
- Simple but inefficient
- Not recommended for production
- Use when other methods fail

**Example**:
```
Delay: 5 seconds
```

**3. Element Exists with Timeout**:
- Checks if element exists
- Waits until timeout or found
- Returns Boolean
- More efficient than Delay

**Example**:
```
Element Exists: selector="..." Timeout="30" Exists: elementFound
If elementFound Then
    Click: selector="..."
End If
```

**4. Retry Scope**:
- Retries activities on failure
- Configurable number of retries
- Can include delay between retries
- Exception handling built-in

**Example**:
```
Retry Scope: NumberOfRetries="3" RetryInterval="00:00:05"
    Try
        Click: selector="..."
    Catch
        LogMessage: "Retry failed"
    End Try
End Retry Scope
```

**5. On Element Appear**:
- Event-based trigger
- Waits for element to appear
- Executes activities when found
- More efficient than polling

**Example**:
```
On Element Appear: selector="..." ContinueOnError="True"
    LogMessage: "Element appeared"
    Click: selector="..."
```

#### Best Practices for Waiting:
- Use WaitForReady when possible
- Avoid fixed delays (use Element Exists)
- Set appropriate timeouts
- Handle timeouts gracefully
- Consider application behavior
- Test on slow connections

### Act on Controls – Mouse and Keyboard Activities

#### Mouse Activities:

**1. Click**:
- Single click on element
- Click types: Single, Double, Up, Down
- Input methods: Simulate, WindowMessage, Hardware
- Modifier keys: Ctrl, Alt, Shift

**Example**:
```
Click: selector="..." ClickType="Single" ModifierKey="Ctrl"
```

**2. Hover**:
- Mouse over element
- Triggers hover events
- Useful for menus/tooltips
- Can be combined with Click

**Example**:
```
Hover: selector="..." HoverDuration="1000"
```

**3. Send Mouse Click**:
- More control over click
- Specify coordinates
- Offset from element
- Useful for specific positions

**Example**:
```
Send Mouse Click: selector="..." MouseButton="Left" 
                  X="50" Y="20" OffsetFromElement="True"
```

**4. Mouse Move**:
- Move mouse to position
- Can be absolute or relative
- Used with Click/Hover
- Less common than Click

**5. Scroll**:
- Scroll element or window
- Direction: Up, Down, Left, Right
- Amount: Number of items or pixels
- Useful for long pages

**Example**:
```
Scroll: selector="..." Direction="Down" ScrollingDistance="3"
```

#### Keyboard Activities:

**1. Type Into**:
- Types text into element
- Input methods: Simulate, WindowMessage, Hardware
- Can include special keys
- Clears field by default

**Example**:
```
Type Into: selector="..." Text="Hello World" SimulateType="True"
```

**Special Keys**:
- `[k(enter)]`: Enter key
- `[k(tab)]`: Tab key
- `[k(ctrl)](a)[k(ctrl)](up)`: Ctrl+A (select all)
- `[k(alt)](f4)`: Alt+F4 (close window)

**2. Send Hotkey**:
- Sends keyboard shortcuts
- Modifier keys + key
- Works on focused element
- Application-specific

**Example**:
```
Send Hotkey: selector="..." Key="s" Modifiers="Ctrl"
```

**3. Get Text**:
- Extracts text from element
- Output methods: FullText, VisibleText, OCR, Native
- Returns as String variable
- Commonly used

**Example**:
```
Get Text: selector="..." Output="extractedText"
```

**4. Set Text**:
- Sets text property (doesn't type)
- Changes internal value
- Faster than Type Into
- Not always supported

#### Input Methods Comparison:

**Simulate (Recommended)**:
- Fastest method
- Works in background
- Doesn't require focus
- May not trigger all events

**Window Messages**:
- Fast
- Requires focus
- Triggers application events
- Good balance

**Hardware Events**:
- Slowest
- Most reliable
- Simulates actual input
- Use when others fail

### Handling Events

#### What are Events?
Events are actions or occurrences that happen during automation, such as an element appearing, a key being pressed, or an exception occurring. Handling events allows responsive and robust automation.

#### Event Types in UiPath:

**1. Element Appear Event**:
- Triggers when element appears
- Waits for element to become visible
- Executes specified activities
- Useful for dynamic content

**Example**:
```
On Element Appear: selector="..." ContinueOnError="True"
    LogMessage: "Loading complete"
    Click: selector="..."
```

**2. Element Vanish Event**:
- Triggers when element disappears
- Waits for element to become invisible
- Useful for loading screens
- Confirms element removal

**Example**:
```
On Element Vanish: selector="loading_indicator"
    LogMessage: "Loading finished"
    Proceed with automation
```

**3. Key Press Event**:
- Triggers on specific key press
- Monitors keyboard input
- User-triggered automation
- Good for attended bots

**Example**:
```
On Key Press: Key="F5" ContinueOnError="True"
    Refresh data
    Re-run automation
```

**4. Image Appear Event**:
- Triggers when image appears on screen
- Uses image recognition
- Useful for non-selectable elements
- Can be slower

**Example**:
```
On Image Appear: Image="success_icon.png" ContinueOnError="True"
    LogMessage: "Operation successful"
```

**5. Monitor Events**:
- Monitors system events
- File created/deleted
- Process started/stopped
- Network events

#### Event Handler Activities:

**1. Event Handler Scope**:
- Container for event handlers
- Can have multiple handlers
- Runs concurrently with main workflow
- Must be in Flowchart or State Machine

**2. Event Handler**:
- Defines specific event
- Contains activities to execute
- Can have conditions
- Independent execution

**Example Structure**:
```
Flowchart
    [Start]
        ↓
    [Event Handler Scope]
        ↓
    [Event Handler: Element Appear]
        ↓
    [Handle Event Activities]
        ↓
    [Main Workflow Activities]
```

#### Best Practices for Event Handling:
- Use events for asynchronous operations
- Keep event handlers simple
- Handle event failures gracefully
- Test event timing carefully
- Consider performance impact
- Document event purposes

### Revisit Recorder

#### Advanced Recorder Features:

**1. Automatic Recording**:
- Records user actions
- Generates selectors automatically
- Creates workflow structure
- Fast initial development

**2. Recorder Types**:
- **Basic**: Simple actions
- **Desktop**: Better for desktop apps
- **Web**: Optimized for browsers
- **Native**: Application-specific

**3. Recording Options**:
- **Delay Between Actions**: Adds stability
- **Default Recording Type**: Preferred method
- **Auto-Generate Container**: Organizes activities
- **Mouse Options**: Click simulation

#### Editing Recorded Workflows:

**1. Refine Selectors**:
- Make selectors more robust
- Remove dynamic attributes
- Add wildcards where needed
- Test with UI Explorer

**2. Add Error Handling**:
- Wrap in Try-Catch
- Add retry logic
- Handle timeouts
- Log errors

**3. Optimize Performance**:
- Remove unnecessary delays
- Use WaitForReady
- Optimize control flow
- Remove redundant activities

**4. Add Variables**:
- Replace hardcoded values
- Make workflow reusable
- Use arguments for parameters
- Improve maintainability

#### Recorder Best Practices:
- Record in clean state
- Use appropriate recorder type
- Review generated selectors
- Add error handling
- Test thoroughly
- Document workflow

### When to Use OCR

#### What is OCR?
OCR (Optical Character Recognition) is technology that converts images of text into machine-readable text. It's used when text cannot be extracted through normal UI automation methods.

#### When to Use OCR:

**1. Virtualized Controls**:
- Controls that don't expose text
- Custom-rendered controls
- Graphics-based text
- Canvas elements

**2. Images and PDFs**:
- Scanned documents
- Screenshots
- Image-based text
- Protected PDFs

**3. Legacy Applications**:
- Old mainframe apps
- Terminal emulators
- Character-based interfaces
- Non-standard UI

**4. Citrix/Virtual Desktops**:
- Remote desktop sessions
- VDI environments
- Cloud applications
- No direct UI access

**5. When Normal Methods Fail**:
- Get Text returns empty
- Selector issues
- Accessibility problems
- Text not exposed

#### When NOT to Use OCR:
- Normal UI automation works
- Text is accessible via selectors
- Performance is critical (OCR is slow)
- Accuracy requirements are very high
- Text changes frequently

### Types of OCR Available

#### OCR Engines in UiPath:

**1. Google OCR (Default)**:
- Free and built-in
- Good accuracy for general text
- Works with multiple languages
- Moderate speed
- No configuration needed

**2. Microsoft OCR**:
- Built into Windows
- Good for English
- Fast processing
- Limited language support
- No additional setup

**3. Abbyy OCR**:
- Commercial engine
- High accuracy
- Multiple languages
- Requires license
- Best for professional use

**4. Tesseract OCR**:
- Open-source engine
- Good accuracy
- Multiple languages
- Free
- Requires installation

#### OCR Engine Comparison:

| Engine | Cost | Accuracy | Speed | Languages | Setup |
|--------|------|----------|-------|----------|-------|
| Google | Free | Good | Moderate | Many | None |
| Microsoft | Free | Good | Fast | Limited | None |
| Abbyy | Paid | Excellent | Fast | Many | License |
| Tesseract | Free | Good | Moderate | Many | Install |

### How to Use OCR

#### OCR Activities:

**1. Get OCR Text**:
- Extracts text from image/element
- Uses specified OCR engine
- Outputs as String
- Configurable accuracy

**Example**:
```
Get OCR Text: selector="..." 
    Engine="Google OCR" 
    Output="extractedText"
    Profile="Screen"
```

**2. OCR Scope**:
- Container for OCR operations
- Improves performance
- Sets OCR context
- Multiple OCR activities inside

**Example**:
```
OCR Scope: Engine="Google OCR" Profile="Screen"
    Get OCR Text: selector="..." Output="text1"
    Get OCR Text: selector="..." Output="text2"
```

#### OCR Configuration:

**Profiles**:
- **Screen**: Optimized for screen text
- **Document**: Optimized for documents
- **Handwriting**: For handwritten text
- **Legacy**: For old-style text

**Settings**:
- **Language**: Text language
- **Scale**: Image scaling (improves accuracy)
- **Extract Words**: Word-level extraction
- **Characters**: Character-level extraction

#### Example: Extracting Text from Image

```
' Method 1: Direct OCR
Get OCR Text: Image="screenshot.png" 
    Engine="Google OCR"
    Output="imageText"

LogMessage("Extracted: " + imageText)

' Method 2: OCR from screen element
Get OCR Text: selector="ctrl name='canvas'" 
    Engine="Google OCR"
    Output="canvasText"

' Method 3: With language specification
Get OCR Text: selector="..." 
    Engine="Google OCR"
    Language="en"
    Output="englishText"
```

#### OCR Best Practices:
- Use OCR only when necessary
- Choose appropriate OCR engine
- Specify correct language
- Scale images for better accuracy
- Handle OCR errors
- Validate extracted text
- Consider performance impact

#### OCR Accuracy Tips:
- Ensure good image quality
- Use appropriate resolution
- Pre-process images if needed
- Test with different engines
- Use language specification
- Handle special characters
- Post-process extracted text

---

## 2. Plugins and Extensions

### Terminal Plugin

#### What is Terminal Automation?
Terminal automation involves interacting with command-line interfaces, terminal emulators, and character-based applications that don't have standard GUI controls.

#### Terminal Plugin Purpose:
- Automate terminal sessions
- Interact with command-line tools
- Automate mainframe applications
- Handle character-based interfaces
- Legacy system integration

#### Terminal Plugin Features:

**1. Terminal Session**:
- Opens terminal connection
- Maintains session state
- Handles authentication
- Manages connection

**Example**:
```
Terminal Session: ConnectionString="host:port"
    Username="user"
    Password="password"
    ConnectionType="SSH"
```

**2. Send Text**:
- Sends commands to terminal
- Simulates keyboard input
- Can include special keys
- Waits for response

**Example**:
```
Send Text: "ls -la" + "[k(enter)]"
```

**3. Get Text**:
- Extracts text from terminal
- Reads screen content
- Captures output
- Returns as String

**Example**:
```
Get Text: Output="terminalOutput"
```

**4. Wait for Text**:
- Waits for specific text to appear
- Useful for synchronization
- Timeout configurable
- Ensures command completion

**Example**:
```
Wait for Text: "command completed" Timeout="30"
```

#### Terminal Connection Types:

**1. SSH (Secure Shell)**:
- Encrypted connection
- Common for Unix/Linux
- Secure authentication
- Widely used

**2. Telnet**:
- Unencrypted connection
- Older protocol
- Less secure
- Legacy systems

**3. Serial**:
- Direct serial connection
- Hardware devices
- Embedded systems
- Specialized use

#### Terminal Automation Example:

```
Terminal Session: ConnectionString="192.168.1.100:22"
    Username="admin"
    Password="password123"
    ConnectionType="SSH"
    
    Send Text: "cd /var/log" + "[k(enter)]"
    Wait for Text: "$" Timeout="5"
    
    Send Text: "tail -100 syslog" + "[k(enter)]"
    Wait for Text: "$" Timeout="10"
    
    Get Text: Output="logContent"
    
    Send Text: "exit" + "[k(enter)]"
```

### SAP Automation

#### What is SAP?
SAP (Systems, Applications, and Products) is enterprise resource planning (ERP) software used by many large organizations for business operations.

#### SAP Automation Challenges:
- Complex UI structure
- Custom controls
- Multiple SAP versions
- Security restrictions
- Transaction codes

#### SAP Automation Plugin:

**1. SAP Session**:
- Connects to SAP GUI
- Manages SAP session
- Handles authentication
- Maintains context

**Example**:
```
Open SAP Session: ConnectionString="SAP connection string"
    Client="100"
    User="username"
    Password="password"
    Language="EN"
```

**2. Execute Transaction**:
- Opens SAP transaction
- Uses transaction codes
- Navigates to screens
- Common transactions:
  - **ME21N**: Create Purchase Order
  - **VA01**: Create Sales Order
  - **FB60**: Post Invoice
  - **MM01**: Create Material

**Example**:
```
Execute Transaction: "VA01"
```

**3. SAP Activities**:
- **Click SAP Button**: Clicks SAP-specific buttons
- **Set SAP Field**: Sets field values
- **Get SAP Table**: Extracts table data
- **Select SAP Item**: Selects from lists
- **SAP Script**: Runs SAP scripts

**Example**:
```
Set SAP Field: FieldName="VBAP-MATNR" Value="MAT001"
Click SAP Button: ButtonName="SAVE"
```

#### SAP Automation Best Practices:
- Use SAP-specific activities
- Understand SAP transaction flow
- Handle SAP security properly
- Test in SAP sandbox first
- Document SAP versions
- Handle SAP errors gracefully

#### SAP Automation Example:

```
Open SAP Session: ConnectionString="..."
    Client="100"
    User="bot_user"
    Password="********"
    
Execute Transaction: "VA01"

Set SAP Field: FieldName="VBAK-AUART" Value="OR"
Set SAP Field: FieldName="VBAK-VKORG" Value="1000"
Set SAP Field: FieldName="VBAK-VTWEG" Value="10"
Set SAP Field: FieldName="VBAK-SPART" Value="00"
Set SAP Field: FieldName="VBAK-SOLD_TO" Value="CUSTOMER001"

Click SAP Button: ButtonName="ENTER"

Set SAP Field: FieldName="VBAP-MATNR" Value="MAT001"
Set SAP Field: FieldName="VBAP-KWMENG" Value="10"

Click SAP Button: ButtonName="SAVE"

Get SAP Field: FieldName="VBAK-VBELN" Output="orderNumber"
```

### Citrix Automation

#### What is Citrix?
Citrix is virtualization technology that provides remote desktop access to applications and desktops running on centralized servers.

#### Citrix Automation Challenges:
- No direct UI access
- Image-based interaction
- Limited selector support
- Performance considerations
- Network latency

#### Citrix Automation Approaches:

**1. Image-Based Automation**:
- Uses screen coordinates
- Image recognition for elements
- Mouse/keyboard simulation
- No selectors needed

**2. OCR with Citrix**:
- Extract text from remote desktop
- Use OCR for data extraction
- Slower but functional
- Requires good image quality

**3. Citrix Plugin**:
- Specialized Citrix activities
- Better performance
- Direct interaction
- Requires Citrix setup

#### Citrix Automation Activities:

**1. Click Image**:
- Clicks on specific image
- Uses image recognition
- Configurable accuracy
- Can use offsets

**Example**:
```
Click Image: Image="submit_button.png" 
           Accuracy="0.8"
           OffsetX="10" OffsetY="5"
```

**2. Get Text (OCR)**:
- Extracts text using OCR
- Works with Citrix
- Slower than normal methods
- Good for data extraction

**Example**:
```
Get OCR Text: Engine="Google OCR"
    Output="citrixText"
```

**3. Type Into**:
- Types into Citrix window
- Uses hardware events
- Requires focus
- Simulates typing

**Example**:
```
Type Into: Text="Hello World" 
           InputMethod="HardwareEvents"
```

#### Citrix Automation Best Practices:
- Use image recognition carefully
- Handle screen resolution changes
- Account for network latency
- Use OCR when needed
- Test on different Citrix configurations
- Consider performance impact

#### Citrix Automation Example:

```
' Connect to Citrix
Open Application: "Citrix Receiver"
    Selector: "wnd app='Citrix.exe'"

' Wait for desktop to load
Delay: 5 seconds

' Click application icon
Click Image: Image="app_icon.png" Accuracy="0.9"

' Wait for application
Delay: 3 seconds

' Type into field
Type Into: Text="username" InputMethod="HardwareEvents"
Send Hotkey: Key="tab"

Type Into: Text="password" InputMethod="HardwareEvents"
Send Hotkey: Key="enter"

' Wait for login
Delay: 5 seconds

' Extract data using OCR
Get OCR Text: Engine="Google OCR" Output="screenData"
```

### Credential Management

#### What is Credential Management?
Credential management is the secure storage and retrieval of sensitive information like usernames, passwords, API keys, and other secrets used in automation.

#### Why Credential Management?
- **Security**: Protects sensitive data
- **Compliance**: Meets security standards
- **Centralization**: Single source of truth
- **Rotation**: Easy credential updates
- **Auditing**: Track credential usage

#### UiPath Credential Management:

**1. Windows Credential Manager**:
- Built-in Windows storage
- System-wide credentials
- Encrypted storage
- Access per user

**2. UiPath Orchestrator Assets**:
- Cloud-based storage
- Centralized management
- Role-based access
- Version control
- Audit logging

**3. Azure Key Vault**:
- Cloud-based secret storage
- High security
- Integration with Azure
- Enterprise features

#### Credential Activities:

**1. Get Credential**:
- Retrieves stored credential
- Returns username and password
- Secure retrieval
- From Windows or Orchestrator

**Example**:
```
Get Credential: AssetName="DatabaseCredentials"
    Output="dbCredential"
    
username = dbCredential.UserName
password = dbCredential.Password
```

**2. Add Credential**:
- Stores new credential
- Windows Credential Manager
- Encrypted storage
- Requires authentication

**Example**:
```
Add Credential: 
    Target="DatabaseConnection"
    Username="db_user"
    Password="********"
```

**3. Delete Credential**:
- Removes stored credential
- From Windows Manager
- Irreversible
- Use with caution

**Example**:
```
Delete Credential: Target="DatabaseConnection"
```

#### Orchestrator Assets:

**Asset Types**:
- **Credential**: Username/password pair
- **Text**: Simple text value
- **Boolean**: True/False value
- **Integer**: Numeric value
- **Secure Text**: Encrypted text

**Using Orchestrator Assets**:
```
Get Asset: AssetName="APIKey"
    Output="apiKey"
    
Get Credential: AssetName="ServiceAccount"
    Output="serviceCred"
```

#### Credential Management Best Practices:
- Never hardcode credentials
- Use credential managers
- Rotate credentials regularly
- Limit credential access
- Audit credential usage
- Use different credentials for environments
- Document credential purposes
- Handle credential expiration

#### Credential Management Example:

```
' Retrieve database credentials
Get Credential: AssetName="DatabaseCredentials"
    Output="dbCredentials"

dbUser = dbCredentials.UserName
dbPassword = dbCredentials.Password

' Connect to database using credentials
Connect To Database: 
    Provider="OleDb"
    ConnectionString="Provider=SQLOLEDB;Data Source=server;Initial Catalog=db;User Id=" + dbUser + ";Password=" + dbPassword

' Retrieve API key
Get Asset: AssetName="APIKey"
    Output="apiKey"

' Use API key for authentication
HTTP Request: 
    Url="https://api.example.com/data"
    Method="GET"
    Headers={"Authorization": "Bearer " + apiKey}
```

---

## Key Exam Points for Unit 3:

### Short Questions:
1. What is window attachment and why is it important?
2. Explain the different types of OCR engines in UiPath
3. When should you use OCR for automation?
4. What are the different wait techniques in UiPath?
5. Explain the purpose of the Terminal plugin
6. What is Citrix automation and its challenges?
7. How do you handle events in UiPath?
8. What is credential management and why is it important?

### Long Questions:
1. Explain the process of finding and attaching windows with examples
2. Describe different techniques for waiting for controls with their use cases
3. Explain OCR in detail including when to use it and different OCR engines
4. Discuss plugins and extensions in UiPath (Terminal, SAP, Citrix)
5. Explain credential management in UiPath with examples
6. Describe how to handle events in UiPath automation

### Practical Aspects:
- Using UI Explorer to create and edit selectors
- Implementing different wait strategies
- Using OCR for text extraction
- Automating terminal sessions
- Working with SAP transactions
- Citrix automation using image recognition
- Storing and retrieving credentials securely
