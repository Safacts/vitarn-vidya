# UNIT 4: User Events, Assistant Bots, Exception Handling & Debugging - Detailed Notes

---

## 1. Handling User Events and Assistant Bots

### Assistant Bots

#### What are Assistant Bots?
Assistant bots are attended robots that work alongside human users to assist them with their tasks. They are designed to enhance human productivity rather than replace humans entirely.

#### Characteristics of Assistant Bots:
- **Attended Mode**: Run on user's machine
- **User-Triggered**: Activated by user actions
- **Collaborative**: Work with human users
- **Interactive**: Can communicate with users
- **Context-Aware**: Understand user context
- **Supportive**: Help users complete tasks

#### Use Cases for Assistant Bots:
- **Customer Service**: Assist agents with customer data
- **Data Entry**: Help users enter data accurately
- **Form Filling**: Auto-fill forms from databases
- **Validation**: Check user inputs for errors
- **Research**: Gather information for users
- **Notifications**: Alert users to important events
- **Guidance**: Provide step-by-step assistance

#### Assistant Bot vs. Traditional Bot:

| Feature | Assistant Bot | Traditional Bot |
|---------|--------------|----------------|
| Execution | Attended, user-triggered | Unattended, scheduled |
| Interaction | Collaborative | Autonomous |
| Speed | Real-time assistance | Batch processing |
| Context | User workspace | Server environment |
| Trigger | User actions | Scheduler/queue |
| Use Case | Front-office | Back-office |

### Monitoring System Event Triggers

#### What are System Events?
System events are occurrences in the operating system or applications that can be monitored and used to trigger automation workflows.

#### Types of System Events:

**1. File System Events**:
- **File Created**: New file appears in directory
- **File Changed**: File content modified
- **File Deleted**: File removed from directory
- **File Renamed**: File name changed
- **Directory Created**: New folder created
- **Directory Deleted**: Folder removed

**Example Use**: Automatically process files when dropped into a folder

**2. Process Events**:
- **Process Started**: Application launches
- **Process Stopped**: Application closes
- **Process Changed**: Process state changes

**Example Use**: Take action when specific application opens/closes

**3. Keyboard Events**:
- **Key Press**: Specific key pressed
- **Key Combination**: Shortcut keys pressed
- **Key Release**: Key released

**Example Use**: Trigger automation with hotkey

**4. Mouse Events**:
- **Mouse Click**: Click at specific location
- **Mouse Move**: Mouse movement
- **Scroll**: Mouse wheel scroll

**Example Use**: Context-sensitive assistance

**5. Window Events**:
- **Window Opened**: New window appears
- **Window Closed**: Window closes
- **Window Focus**: Window gains/loses focus
- **Window Moved**: Window position changes

**Example Use**: Assist when specific window is active

#### Monitoring System Events in UiPath:

**1. Monitor Events Activity**:
- Monitors specified events
- Triggers workflow on event
- Configurable event types
- Can filter events

**Example**:
```
Monitor Events: Event="FileCreated"
    Path="C:\Input\*.pdf"
    Trigger: ProcessPDF.xaml
```

**2. Event Handler Scope**:
- Container for event handlers
- Can monitor multiple events
- Runs concurrently
- Only in Flowchart/State Machine

**Example**:
```
Event Handler Scope
    Event Handler: FileCreated
        Process file
    Event Handler: KeyPress(F5)
        Refresh data
```

#### File System Monitoring Example:

```
' Monitor for new files in input folder
Monitor Events: Event="FileCreated"
    Path="C:\Input\*.csv"
    IncludeSubdirectories="False"
    
    ' Process the new file
    Dim filePath As String = eventArgs.FullPath
    ProcessCSVFile(filePath)
    
    ' Move to processed folder
    Dim fileName As String = Path.GetFileName(filePath)
    File.Move(filePath, "C:\Processed\" + fileName)
    
    LogMessage("Processed: " + fileName)
```

### Monitoring Image and Element Triggers

#### Image Triggers:

**What are Image Triggers?**
Image triggers use image recognition to detect when a specific image appears on the screen and trigger automation in response.

**Use Cases for Image Triggers**:
- **Status Indicators**: Detect success/failure icons
- **Notifications**: Detect notification popups
- **Loading Screens**: Wait for loading to complete
- **Error Messages**: Detect error icons
- **Dynamic Elements**: Elements without stable selectors

**Image Trigger Activities**:

**1. On Image Appear**:
- Waits for image to appear
- Triggers when image detected
- Configurable accuracy
- Timeout support

**Example**:
```
On Image Appear: Image="success_icon.png"
    Accuracy="0.9"
    Timeout="30"
    ContinueOnError="True"
    
    LogMessage("Operation successful")
    Proceed to next step
```

**2. On Image Vanish**:
- Waits for image to disappear
- Triggers when image no longer visible
- Useful for loading screens
- Timeout support

**Example**:
```
On Image Vanish: Image="loading_spinner.gif"
    Timeout="60"
    
    LogMessage("Loading complete")
    Continue automation
```

#### Element Triggers:

**What are Element Triggers?**
Element triggers monitor UI elements and trigger automation when specific element states change (appear, disappear, become enabled/disabled).

**Element Trigger Activities**:

**1. On Element Appear**:
- Monitors for element to appear
- Uses selector to identify element
- Triggers when element becomes visible
- More efficient than polling

**Example**:
```
On Element Appear: selector="ctrl name='submit_button'"
    Timeout="30"
    
    LogMessage("Submit button appeared")
    Click: selector="..."
```

**2. On Element Vanish**:
- Monitors for element to disappear
- Triggers when element becomes invisible
- Useful for waiting for elements to hide
- Timeout support

**Example**:
```
On Element Vanish: selector="ctrl name='loading_indicator'"
    Timeout="60"
    
    LogMessage("Loading finished")
    Continue with workflow
```

**3. On Element Change**:
- Monitors for element property changes
- Triggers when property value changes
- Can monitor text, state, etc.
- Useful for dynamic content

**Example**:
```
On Element Change: selector="ctrl name='status_text'"
    Property="Text"
    
    LogMessage("Status changed")
    HandleStatusChange()
```

#### Image vs. Element Triggers:

| Aspect | Image Triggers | Element Triggers |
|--------|---------------|------------------|
| Identification | Image recognition | Selectors |
| Accuracy | Dependent on image quality | High |
| Performance | Slower (OCR/image processing) | Faster |
| Use Case | Non-selectable elements | Standard UI elements |
| Maintenance | Image updates needed | Selector updates |

#### Best Practices for Triggers:
- Use element triggers when possible (faster)
- Use image triggers for non-selectable elements
- Set appropriate timeouts
- Handle trigger failures gracefully
- Test trigger reliability
- Consider performance impact

### Launching an Assistant Bot on a Keyboard Event

#### Keyboard Event Triggers:

**What are Keyboard Events?**
Keyboard events detect specific key presses or key combinations and trigger automation in response. This is a common way to launch assistant bots.

#### Key Event Types:

**1. Single Key Press**:
- Detects specific key
- Examples: F1, F5, Escape
- Useful for help functions

**2. Key Combinations**:
- Detects multiple keys together
- Examples: Ctrl+Shift+A, Alt+F4
- Common for shortcuts

**3. Modifier Keys**:
- Ctrl, Alt, Shift
- Used with other keys
- Creates shortcuts

#### Implementing Keyboard Triggers:

**1. On Key Press Activity**:
- Monitors keyboard input
- Triggers on specific key
- Can specify modifiers
- Works with attended bots

**Example**:
```
On Key Press: Key="F5"
    Modifiers="Ctrl"
    ContinueOnError="True"
    
    RefreshData()
    LogMessage("Data refreshed")
```

**2. Hotkey Trigger**:
- Global hotkey registration
- System-wide monitoring
- Works even when app not focused
- Requires specific permissions

**Example**:
```
Register Hotkey: Key="F10"
    Modifiers="Ctrl+Shift"
    Action="LaunchAssistantBot"
```

#### Assistant Bot Launch Example:

```
' Main workflow runs continuously
While True
    ' Wait for keyboard trigger
    On Key Press: Key="F9"
        Modifiers="Ctrl"
        Timeout="0"
        ContinueOnError="True"
        
        ' Launch assistant bot
        LogMessage("Assistant bot launched")
        ShowAssistantUI()
        
        ' Get user input
        userInput = GetUserInput()
        
        ' Process user request
        ProcessUserRequest(userInput)
        
        ' Display results
        DisplayResults()
        
        LogMessage("Assistant bot completed")
    End On Key Press
    
    ' Small delay to prevent CPU overload
    Delay: 100 milliseconds
End While
```

#### Keyboard Event Best Practices:
- Choose uncommon key combinations
- Avoid conflicting with application shortcuts
- Document hotkeys for users
- Test on different keyboards/layouts
- Handle key press failures
- Consider user permissions

#### Real-World Example: Customer Service Assistant

```
' Assistant bot helps customer service agents
On Key Press: Key="F8"
    Modifiers="Ctrl"
    
    ' Get customer phone number from screen
    phoneNumber = GetTextFromScreen("phone_number_field")
    
    ' Look up customer in CRM
    customerData = LookupCustomerCRM(phoneNumber)
    
    ' Display customer information
    DisplayCustomerInfo(customerData)
    
    ' Suggest next actions
    SuggestActions(customerData)
```

---

## 2. Exception Handling, Debugging, and Logging

### Exception Handling

#### What are Exceptions?
Exceptions are errors that occur during workflow execution that disrupt normal flow. Exception handling is the process of catching and managing these errors gracefully.

#### Why Exception Handling?
- **Robustness**: Prevent workflow crashes
- **Recovery**: Allow workflow to continue
- **Logging**: Record error information
- **User Experience**: Provide meaningful feedback
- **Maintenance**: Easier debugging
- **Reliability**: Handle unexpected situations

#### Exception Types in UiPath:

**1. System Exception**:
- Base class for all exceptions
- General system errors
- Catch-all for unknown errors

**2. Application Exception**:
- Application-specific errors
- Custom exceptions
- Business logic errors

**3. UI Automation Exception**:
- UI interaction failures
- Element not found
- Selector issues

**4. Business Rule Exception**:
- Business logic violations
- Validation failures
- Data rule violations

**5. Timeout Exception**:
- Operation timed out
- Element not ready
- Network timeout

**6. ArgumentException**:
- Invalid argument passed
- Wrong data type
- Out of range values

**7. InvalidOperationException**:
- Invalid operation for current state
- Wrong sequence of operations

#### Exception Handling Activities:

**1. Try-Catch Activity**:
- Primary exception handling mechanism
- Try block: Code that might fail
- Catch block: Handle exceptions
- Finally block: Always executes

**Structure**:
```
Try
    [Code that might throw exception]
Catch (ExceptionType)
    [Handle specific exception]
Catch (Exception)
    [Handle all other exceptions]
Finally
    [Cleanup code, always executes]
End Try
```

**Example**:
```
Try
    ' Attempt to read file
    fileContent = File.ReadAllText(filePath)
Catch (FileNotFoundException)
    LogMessage("File not found: " + filePath)
    Throw New BusinessRuleException("File required")
Catch (IOException)
    LogMessage("IO Error reading file")
    RetryFileRead(filePath)
Catch (Exception ex)
    LogMessage("Unexpected error: " + ex.Message)
    Throw
Finally
    ' Cleanup resources
    CloseFileHandles()
End Try
```

**2. Throw Activity**:
- Raises an exception
- Can throw new or re-throw
- Used for custom error handling
- Stops current workflow

**Example**:
```
If orderAmount > 10000 Then
    Throw New BusinessRuleException("Order amount exceeds limit")
End If
```

**3. Rethrow Activity**:
- Re-throws caught exception
- Preserves original stack trace
- Used in catch blocks
- Passes exception up the chain

**Example**:
```
Catch (Exception ex)
    LogMessage("Error occurred: " + ex.Message)
    Rethrow  ' Pass exception to caller
End Catch
```

**4. Retry Scope Activity**:
- Retries activities on failure
- Configurable retry count
- Delay between retries
- Conditional retry

**Example**:
```
Retry Scope: NumberOfRetries="3" RetryInterval="00:00:05"
    Try
        ConnectToDatabase()
    Catch (Exception)
        LogMessage("Connection failed, retrying...")
    End Try
End Retry Scope
```

#### Common Exceptions and Ways to Handle Them:

**1. Element Not Found Exception**:
- **Cause**: UI element doesn't exist or selector incorrect
- **Handling**:
  - Verify selector
  - Add Element Exists check
  - Increase timeout
  - Use retry logic

**Example**:
```
If Element Exists: selector="..." Timeout="30" Exists="elementFound"
    If elementFound Then
        Click: selector="..."
    Else
        LogMessage("Element not found, using alternative method")
        AlternativeMethod()
    End If
End If
```

**2. Timeout Exception**:
- **Cause**: Operation took longer than expected
- **Handling**:
  - Increase timeout
  - Add retry logic
  - Check application state
  - Optimize performance

**Example**:
```
Try
    Click: selector="..." Timeout="60"
Catch (TimeoutException)
    LogMessage("Timeout, retrying...")
    RetryScope: NumberOfRetries="3"
        Click: selector="..." Timeout="60"
    End RetryScope
End Try
```

**3. Selector Not Found Exception**:
- **Cause**: Selector doesn't match any element
- **Handling**:
  - Use UI Explorer to fix selector
  - Add wildcards
  - Use alternative selectors
  - Use image/OCR fallback

**Example**:
```
Try
    Click: selector="..."
Catch (SelectorNotFoundException)
    LogMessage("Selector failed, trying OCR")
    UseOCRAlternative()
End Try
```

**4. Null Reference Exception**:
- **Cause**: Accessing null object
- **Handling**:
  - Check for null before use
  - Initialize variables
  - Validate inputs

**Example**:
```
If customerData IsNot Nothing Then
    ProcessCustomer(customerData)
Else
    LogMessage("Customer data is null")
    Throw New BusinessRuleException("Customer data required")
End If
```

**5. File Not Found Exception**:
- **Cause**: File doesn't exist
- **Handling**:
  - Check file exists first
  - Create file if needed
  - Handle gracefully

**Example**:
```
If File.Exists(filePath) Then
    ProcessFile(filePath)
Else
    LogMessage("File not found, creating new file")
    CreateNewFile(filePath)
End If
```

**6. Invalid Cast Exception**:
- **Cause**: Type conversion failure
- **Handling**:
  - Validate types before conversion
  - Use TryCast
  - Handle conversion errors

**Example**:
```
Dim value As Object = GetSomeValue()
If TypeOf value Is String Then
    stringValue = DirectCast(value, String)
Else
    LogMessage("Invalid type conversion")
    stringValue = value.ToString()
End If
```

#### Exception Handling Best Practices:
- Catch specific exceptions first
- Always include generic exception handler
- Log all exceptions with details
- Provide meaningful error messages
- Clean up resources in Finally block
- Don't catch exceptions you can't handle
- Use meaningful exception types
- Document exception handling logic
- Test exception scenarios

### Logging and Taking Screenshots

#### What is Logging?
Logging is the process of recording information about workflow execution, including status, errors, and important events. It's essential for debugging and monitoring.

#### Logging Levels:

**1. Trace**:
- Most detailed information
- Development and debugging
- Not used in production
- Example: Variable values, step details

**2. Debug**:
- Detailed debugging information
- Development phase
- Helps identify issues
- Example: Loop iterations, conditions

**3. Info**:
- General information
- Normal operation
- Useful for monitoring
- Example: Workflow started, file processed

**4. Warn**:
- Warning messages
- Potential issues
- Not critical
- Example: Slow performance, deprecated feature

**5. Error**:
- Error messages
- Exceptions occurred
- Workflow may continue
- Example: Element not found, file read failed

**6. Fatal**:
- Critical errors
- Workflow stopped
- Requires attention
- Example: System crash, authentication failure

#### Log Message Activity:

**Syntax**:
```
Log Message: "Message text"
    Level="Info"
    Exception="exceptionObject"
```

**Example**:
```
Log Message: "Workflow started" Level="Info"
Log Message: "Processing file: " + fileName Level="Debug"
Log Message: "Element not found" Level="Warn"
Log Message: "Error reading file: " + ex.Message Level="Error" Exception=ex
```

#### Taking Screenshots:

**Why Take Screenshots?**
- **Debugging**: Visual evidence of issues
- **Error Documentation**: Show error state
- **Testing**: Verify UI states
- **Audit**: Record automation steps
- **Support**: Provide visual context

#### Screenshot Activities:

**1. Take Screenshot**:
- Captures screen or window
- Saves to file
- Can output as Image object
- Configurable area

**Example**:
```
Take Screenshot: 
    Selector="wnd app='notepad.exe'"
    Output="screenshotImage"
    SaveToFile="C:\Screenshots\error.png"
```

**2. Screenshot Activity**:
- Built-in screenshot capture
- Automatic on error
- Configurable trigger
- Useful for debugging

**Example**:
```
Try
    ProcessData()
Catch (Exception ex)
    Take Screenshot: SaveToFile="C:\Error\" + DateTime.Now.ToString("yyyyMMddHHmmss") + ".png"
    LogMessage: "Error occurred, screenshot saved" Level="Error"
    Throw
End Try
```

#### Screenshot on Error:

**Automatic Screenshot on Exception**:
- Configure project settings
- Automatically capture on error
- Saves to specified location
- Includes timestamp

**Manual Screenshot in Exception Handler**:
```
Catch (Exception ex)
    Dim timestamp As String = DateTime.Now.ToString("yyyyMMdd_HHmmss")
    Dim screenshotPath As String = "C:\ErrorScreenshots\error_" + timestamp + ".png"
    
    Take Screenshot: SaveToFile=screenshotPath
    LogMessage: "Error: " + ex.Message + Environment.NewLine + 
                "Screenshot saved to: " + screenshotPath
    Level="Error"
    
    Throw
End Catch
```

#### Logging Best Practices:
- Use appropriate log levels
- Include context in log messages
- Log important events
- Log exceptions with details
- Don't log sensitive data
- Use structured logging when possible
- Review logs regularly
- Archive old logs

#### Screenshot Best Practices:
- Take screenshots on errors
- Include timestamps in filenames
- Organize screenshots by date/error type
- Clean up old screenshots
- Don't take screenshots of sensitive data
- Use appropriate image quality
- Document screenshot locations

### Debugging Techniques

#### What is Debugging?
Debugging is the process of identifying and fixing errors in automation workflows. UiPath provides powerful debugging tools to help developers troubleshoot issues.

#### Debugging Tools in UiPath:

**1. Breakpoints**:
- Pause execution at specific point
- Inspect variable values
- Step through code
- Set condition for breakpoint

**Setting Breakpoints**:
- Click in left margin of designer
- Red dot indicates breakpoint
- Can set multiple breakpoints
- Right-click for options

**Conditional Breakpoints**:
- Break only when condition is true
- Useful for loops
- Reduces debugging time

**Example**:
```
For Each item In items
    ' Breakpoint with condition: item = "Critical"
    ProcessItem(item)
Next
```

**2. Step Into**:
- Execute one activity at a time
- Enter invoked workflows
- Detailed execution
- F11 shortcut

**3. Step Over**:
- Execute one activity at a time
- Skip invoked workflows
- Faster debugging
- F10 shortcut

**4. Step Out**:
- Complete current workflow
- Return to caller
- Exit from invoked workflow
- Shift+F11 shortcut

**5. Continue**:
- Resume normal execution
- Run to next breakpoint
- F5 shortcut

**6. Watch Panel**:
- Monitor variable values
- Add expressions to watch
- Updates in real-time
- Useful for complex expressions

**7. Locals Panel**:
- Shows all local variables
- Displays current values
- Auto-updates during debugging
- Quick variable inspection

**8. Call Stack Panel**:
- Shows execution path
- Displays workflow hierarchy
- Helps understand flow
- Navigate to different levels

**9. Immediate Panel**:
- Execute code during debugging
- Test expressions
- Modify variable values
- Evaluate conditions

**10. Output Panel**:
- Shows log messages
- Displays debug output
- Shows error messages
- Execution information

#### Debugging Workflow:

**Step 1: Identify the Issue**
- Review error messages
- Check log files
- Reproduce the issue
- Note symptoms

**Step 2: Set Breakpoints**
- Place breakpoints at strategic locations
- Before suspected error location
- After critical operations
- At decision points

**Step 3: Start Debugging**
- Click Debug or press F5
- Execution stops at first breakpoint
- Inspect variable values
- Verify logic

**Step 4: Step Through Code**
- Use Step Into/Over
- Monitor variable changes
- Verify control flow
- Check selector matches

**Step 5: Analyze and Fix**
- Identify root cause
- Implement fix
- Test fix
- Remove breakpoints

#### Debugging Tips:

**1. Start Small**:
- Debug small sections
- Isolate the problem
- Test individual components

**2. Use Log Messages**:
- Add log messages at key points
- Track execution flow
- Log variable values
- Helps identify where issue occurs

**Example**:
```
Log Message: "Starting file processing" Level="Info"
Log Message: "File path: " + filePath Level="Debug"
Log Message: "File exists: " + File.Exists(filePath).ToString() Level="Debug"
```

**3. Check Selectors**:
- Use UI Explorer
- Highlight elements
- Test selectors
- Verify uniqueness

**4. Verify Variables**:
- Check variable values
- Verify data types
- Check for null values
- Validate ranges

**5. Test Edge Cases**:
- Empty collections
- Null values
- Boundary conditions
- Invalid inputs

**6. Use Highlight**:
- Highlight elements before interaction
- Verify element is found
- Check element visibility
- Ensure element is enabled

**Example**:
```
Highlight: selector="..." Duration="2"
Delay: 2 seconds
Click: selector="..."
```

#### Common Debugging Scenarios:

**Scenario 1: Element Not Found**
- Check selector in UI Explorer
- Verify element exists
- Check if element is visible
- Increase timeout
- Use Element Exists activity

**Scenario 2: Wrong Variable Value**
- Add breakpoint before variable use
- Check variable in Locals panel
- Trace variable assignment
- Verify logic

**Scenario 3: Workflow Not Executing**
- Check if workflow is invoked
- Verify condition logic
- Check control flow
- Add log messages

**Scenario 4: Performance Issues**
- Use stopwatch to time sections
- Identify slow activities
- Optimize loops
- Reduce unnecessary waits

**Scenario 5: Intermittent Failures**
- Add retry logic
- Increase timeouts
- Add error handling
- Log detailed information

#### Debugging Best Practices:
- Use meaningful variable names
- Add comments to complex logic
- Test frequently during development
- Use version control
- Document debugging findings
- Fix root cause, not symptoms
- Test fixes thoroughly
- Keep debug code minimal

### Collecting Crash Dumps

#### What are Crash Dumps?
Crash dumps are snapshots of application memory at the time of a crash. They contain detailed information about the application state when the failure occurred.

#### When to Collect Crash Dumps:
- Application crashes unexpectedly
- Robot crashes during execution
- System-level failures
- Recurring unexplained errors
- For support ticket submission

#### Collecting Crash Dumps:

**1. Automatic Collection**:
- Configure UiPath to collect dumps
- Set up in project settings
- Automatic on crash
- Saves to specified location

**2. Manual Collection**:
- Use Windows Task Manager
- Use Procdump tool
- Use DebugDiag
- Third-party tools

**Using Task Manager**:
1. Open Task Manager
2. Right-click on process
3. Select "Create Dump File"
4. Save dump file

**Using Procdump**:
```
procdump -e -ma -x C:\Dumps UiPath.Studio.exe
```

#### Crash Dump Information:
- Thread states
- Memory contents
- Variable values
- Call stack
- Loaded modules
- Exception information

#### Crash Dump Analysis:
- Open in debugger (WinDbg, Visual Studio)
- Analyze call stack
- Identify exception
- Review memory state
- Find root cause

#### Best Practices for Crash Dumps:
- Collect dumps only when needed
- Include error logs with dumps
- Document steps to reproduce
- Clean up old dumps
- Secure sensitive dumps
- Share only with support team

### Error Reporting

#### What is Error Reporting?
Error reporting is the process of documenting and communicating errors that occur during automation execution to appropriate stakeholders.

#### Error Reporting Components:

**1. Error Details**:
- Error message
- Stack trace
- Timestamp
- Workflow name
- Robot name
- Machine name

**2. Context Information**:
- Input data
- Variable values
- Screenshots
- Log entries
- System state

**3. Impact Assessment**:
- Severity level
- Affected processes
- Data impact
- Business impact

#### Error Reporting Methods:

**1. Orchestrator Alerts**:
- Built-in alert system
- Email notifications
- Real-time monitoring
- Dashboard visibility

**2. Email Notifications**:
- Send error emails
- Include details
- Attach screenshots
- Custom formatting

**Example**:
```
Send SMTP Mail:
    From="rpa@company.com"
    To="support@company.com"
    Subject="RPA Error: " + workflowName
    Body="Error occurred in workflow: " + workflowName + Environment.NewLine +
          "Error message: " + ex.Message + Environment.NewLine +
          "Timestamp: " + DateTime.Now.ToString()
```

**3. Database Logging**:
- Store errors in database
- Query and analyze
- Generate reports
- Track trends

**4. Ticket System Integration**:
- Create support tickets
- Jira, ServiceNow integration
- Automatic ticket creation
- Track resolution

**5. Custom Reporting**:
- Custom error pages
- Web portals
- API endpoints
- Custom dashboards

#### Error Severity Levels:

**1. Critical**:
- Workflow completely stopped
- Data corruption possible
- Business impact high
- Immediate attention required

**2. High**:
- Workflow partially failed
- Some data affected
- Business impact medium
- Urgent attention

**3. Medium**:
- Workflow continued with errors
- Minimal data impact
- Business impact low
- Attention needed

**4. Low**:
- Minor issues
- No data impact
- No business impact
- Log for review

#### Error Reporting Best Practices:
- Report errors immediately
- Include all relevant details
- Use consistent format
- Assign severity appropriately
- Route to correct team
- Track resolution
- Analyze error trends
- Implement preventive measures

#### Error Reporting Example:

```
Try
    ProcessOrder(orderData)
Catch (Exception ex)
    ' Log error
    LogMessage: "Error processing order: " + ex.Message Level="Error"
    
    ' Take screenshot
    Take Screenshot: SaveToFile="C:\Errors\order_error_" + timestamp + ".png"
    
    ' Create error report
    Dim errorReport As String = "Error Report" + Environment.NewLine +
                                "Workflow: ProcessOrder" + Environment.NewLine +
                                "Error: " + ex.Message + Environment.NewLine +
                                "Timestamp: " + DateTime.Now.ToString() + Environment.NewLine +
                                "Order ID: " + orderData.OrderID + Environment.NewLine +
                                "Stack Trace: " + ex.StackTrace
    
    ' Send email notification
    Send SMTP Mail:
        Subject="CRITICAL: Order Processing Error"
        Body=errorReport
        To="support@company.com"
    
    ' Create support ticket
    CreateTicket: 
        Title="Order Processing Error - Order " + orderData.OrderID
        Severity="High"
        Description=errorReport
    
    ' Throw to stop workflow
    Throw
End Try
```

---

## Key Exam Points for Unit 4:

### Short Questions:
1. What are assistant bots and their characteristics?
2. Explain different types of system events
3. What are image triggers and when are they used?
4. How do you launch an assistant bot using keyboard events?
5. What are the different exception types in UiPath?
6. Explain the Try-Catch-Finally structure
7. What are the different logging levels?
8. How do you take screenshots in UiPath?

### Long Questions:
1. Explain assistant bots and their use cases in detail
2. Describe monitoring system events, image triggers, and element triggers
3. Explain exception handling in UiPath with examples
4. Discuss common exceptions and how to handle them
5. Explain debugging techniques in UiPath
6. Describe logging, screenshots, and error reporting mechanisms

### Practical Aspects:
- Creating event handlers for system events
- Implementing keyboard-triggered assistant bots
- Using image and element triggers
- Implementing Try-Catch exception handling
- Using debugging tools (breakpoints, step through)
- Taking screenshots on errors
- Setting up error reporting with email notifications
