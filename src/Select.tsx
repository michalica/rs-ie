import React, {
  CSSProperties,
  HTMLAttributes,
  useCallback,
  useState
} from "react";
import clsx from "clsx";
import Select from "react-select";
import {
  createStyles,
  emphasize,
  makeStyles,
  useTheme,
  Theme
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NoSsr from "@material-ui/core/NoSsr";
import TextField, { BaseTextFieldProps } from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
import PropTypes from "prop-types";
import { ValueContainerProps } from "react-select/lib/components/containers";
import { ControlProps } from "react-select/lib/components/Control";
import { MenuProps, NoticeProps } from "react-select/lib/components/Menu";
import { MultiValueProps } from "react-select/lib/components/MultiValue";
import { OptionProps } from "react-select/lib/components/Option";
import { PlaceholderProps } from "react-select/lib/components/Placeholder";
import { SingleValueProps } from "react-select/lib/components/SingleValue";
import { List } from "react-virtualized";

interface OptionType {
  label: string;
  value: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    input: {
      display: "flex",
      padding: 0,
      height: "auto"
    },
    valueContainer: {
      display: "flex",
      flexWrap: "wrap",
      flex: 1,
      alignItems: "center",
      overflow: "hidden"
    },
    chip: {
      margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      )
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2),
      root: {
        "@media (max-width: 768px)": {
          fontSize: 14
        }
      }
    },
    singleValue: {
      fontSize: 16,
      "@media (max-width: 768px)": {
        fontSize: 14
      }
    },
    placeholder: {
      position: "absolute",
      left: 2,
      bottom: 6,
      fontSize: 16,
      "@media (max-width: 768px)": {
        fontSize: 14
      }
    },
    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0
    },
    divider: {
      height: theme.spacing(2)
    }
  })
);

function NoOptionsMessage(props: NoticeProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
} as any;

type InputComponentProps = Pick<BaseTextFieldProps, "inputRef"> &
  HTMLAttributes<HTMLDivElement>;

function inputComponent({ inputRef, ...props }: InputComponentProps) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
} as any;

function Control(props: ControlProps<OptionType>) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps }
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
      {...TextFieldProps}
    />
  );
}

Control.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  selectProps: PropTypes.object.isRequired
} as any;

function Option(props: OptionProps<OptionType>) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.data.labelInMenu}
    </MenuItem>
  );
}

Option.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  isFocused: PropTypes.bool,
  isSelected: PropTypes.bool
} as any;

function Placeholder(props: PlaceholderProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

Placeholder.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
} as any;

function SingleValue(props: SingleValueProps<OptionType>) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired
} as any;

function ValueContainer(props: ValueContainerProps<OptionType>) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired
} as any;

function MultiValue(props: MultiValueProps<OptionType>) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={clsx(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool,
  removeProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired
} as any;

function Menu(props: MenuProps<OptionType>) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  children: PropTypes.node,
  innerProps: PropTypes.object,
  selectProps: PropTypes.object
} as any;

const DropdownIndicator = () => {
  return (
    <svg
      className="MuiSvgIcon-root MuiSelect-icon"
      focusable="false"
      viewBox="0 0 24 24"
      aria-hidden="true"
      role="presentation"
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
};

const rowHeight = 45;

const MenuList = (props: any) => {
  const { children } = props;
  // const initialOffset = options.indexOf(value) * rowHeight;
  const [width, setWidth] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  if (children.length === undefined) {
    return <div>{children}</div>;
  }

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }: {
    key: any;
    index: any;
    isScrolling: any;
    isVisible: any;
    style: any;
  }) {
    return (
      <div key={key} style={style}>
        {children[index]}
      </div>
    );
  }

  const index = children.reduce((acc: any, val: any, idx: any) => {
    if (val.props.isFocused) {
      return idx;
    }

    return acc;
  }, 0);

  return (
    <div ref={measuredRef} style={{ maxHeight: 165 }}>
      <Paper square className={props.selectProps.classes.paper}>
        <List
          height={children.length > 4 ? 165 : children.length * 45}
          rowCount={children.length}
          rowHeight={rowHeight}
          width={width}
          rowRenderer={rowRenderer}
          scrollToIndex={index}
          containerStyle={{
            width: "100%",
            maxWidth: "100%"
          }}
        />
      </Paper>
    </div>
  );
};

const components = {
  Control,
  Menu,
  MenuList,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator
};

export default function IntegrationReactSelect(props: any) {
  const classes = useStyles();
  const theme = useTheme();

  const selectStyles = {
    input: (base: CSSProperties) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit"
      },
      paddingTop: 7
    }),
    container: (base: CSSProperties) => ({
      ...base,
      maxWidth: 400,
      minWidth: 400
    }),
    indicatorSeparator: (base: CSSProperties) => ({
      ...base,
      display: "none"
    }),
    indicatorsContainer: (base: CSSProperties) => ({
      ...base,
      marginRight: 20,
      "& :hover": {
        cursor: "pointer"
      }
    }),
    clearIndicator: (base: CSSProperties) => ({
      ...base,
      display: props.isMulti ? "none" : "inline-block",
      padding: 4,
      marginRight: 10
    })
  };

  return (
    <div className={classes.root}>
      <NoSsr>
        <Select
          // menuIsOpen={true}
          classes={classes}
          styles={selectStyles}
          inputId="react-select-single"
          TextFieldProps={{
            label: props.label,
            InputLabelProps: {
              htmlFor: "Ort",
              shrink: true
            },
            placeholder: "Ort"
          }}
          placeholder={props.placeholder}
          options={props.options}
          components={components}
          name={props.name}
          value={props.value}
          onChange={(option: Option) => {
            props.setFieldValue(props.field.name, option);
          }}
          isClearable={true}
          isLoading={props.isLoading}
          isMulti={props.isMulti}
          noOptionsMessage={({ inputValue }) => props.noOptionsMessage}
        />
      </NoSsr>
    </div>
  );
}
